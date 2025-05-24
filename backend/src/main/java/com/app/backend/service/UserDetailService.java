package com.app.backend.service;

import com.app.backend.model.Bus;
import com.app.backend.model.User;
import com.app.backend.repository.UserRepository;
import com.app.backend.response.LoginResponse;
import com.app.backend.response.RegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private @Lazy BusService busService;

    @Autowired
    private @Lazy AuthenticationManager authenticationManager;

    @Autowired
    private ApplicationContext applicationContext;
    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if(user== null){
            throw new UsernameNotFoundException("User not found with the given email");
        }
        return user;
    }

    public RegisterResponse register(User user){

        if(userRepository.findByEmail(user.getEmail())!=null){
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessage("User already exists. Try Login");
            registerResponse.setStatus(false);
            return registerResponse;
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User dbUser = userRepository.save(user);
        if(dbUser!=null){
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessage("User registered");
            registerResponse.setStatus(true);
            registerResponse.setToken(jwtService.generateToken(user.getEmail()));
            registerResponse.setId(dbUser.getId());
            return registerResponse;
        }
        else{
            return new RegisterResponse(user.getId(),"User not registered",false,null);
        }
    }

    public LoginResponse verify(User user) {
        //not necessary to use it.
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        if(authentication.isAuthenticated()){
            User dbUser = userRepository.findByEmail(user.getEmail());
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setMessage("User logged in");
            loginResponse.setStatus(true);
            loginResponse.setToken(jwtService.generateToken(user.getEmail()));
            loginResponse.setId(dbUser.getId());
            return loginResponse;
        }
        else{
            return new LoginResponse(user.getId(),"User not Logged in",false,null);
        }
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User find(String email){
        return userRepository.findByEmail(email);
    }

    public boolean book(String email, Bus bus) {
        User user = userRepository.findByEmail(email);
        if(user!=null){
            if(bus.getSeats()>0){
                bus.setSeats(bus.getSeats()-1);
                busService.save(bus);
            }
            else{
                return false;
            }
            List<Bus> buses=user.getBookedBuses();
            buses.add(bus);
            user.setBookedBuses(buses);
            userRepository.save(user);
            return true;
        }
        else{
            return false;
        }
    }

    public List<Bus> cancel(String email, Bus bus) {
        User user = userRepository.findByEmail(email);

        if(user!=null){
            List<Bus> buses=user.getBookedBuses();
            buses.remove(bus);
            bus.setSeats(bus.getSeats()+1);
            busService.save(bus);
            List<Bus> cancelledBuses=user.getCancelledBuses();
            cancelledBuses.add(bus);
            user.setBookedBuses(buses);
            user.setCancelledBuses(cancelledBuses);

            userRepository.save(user);
            return buses;
        }
        else {
            return null;
        }
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
