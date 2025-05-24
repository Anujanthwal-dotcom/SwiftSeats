package com.app.backend.service;

import com.app.backend.model.Bus;
import com.app.backend.model.User;
import com.app.backend.repository.BusRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;

    @Autowired
    private UserDetailService userDetailService;


    public List<Bus> get(String from, String to, DayOfWeek dayOfWeek) {
        return busRepository.findAvailableBuses(from,to,dayOfWeek.toString());
    }

    public List<Bus> getAll() {
        return busRepository.findAll();
    }

    public List<Bus> getAdminBuses(String email) {
        User user = userDetailService.loadUserByUsername(email);

        if(user!=null){
            return user.getOwnedBuses();
        }
        else {
            return new ArrayList<>();
        }
    }

    public boolean add(String email, Bus bus) {

        bus.setOwnerEmail(email);
        bus.setSeats(bus.getMaxSeats());
        Bus bus1 = busRepository.save(bus);

        User user = userDetailService.loadUserByUsername(email);
        List<Bus> buses = user.getOwnedBuses();
        buses.add(bus1);
        user.setOwnedBuses(buses);
        userDetailService.save(user);


        if(bus1!=null){
            return true;
        }
        else {
            return false;
        }
    }

    public boolean manage(Bus bus) {
        Bus bus1 = busRepository.save(bus);
        if(bus1!=null){
            return true;
        }
        return false;
    }

    public void delete(String email, ObjectId busId) {
        User user=userDetailService.loadUserByUsername(email);
        Optional<Bus> bus = busRepository.findById(busId);
        Bus deletingBus = null;

        if(bus.isPresent()){
            deletingBus = bus.get();
        }


        List<Bus> owBuses = user.getOwnedBuses();
        owBuses.remove(deletingBus);
        user.setOwnedBuses(owBuses);
        assert deletingBus != null;
        busRepository.delete(deletingBus);
        userDetailService.save(user);
    }

    public void save(Bus bus) {
        busRepository.save(bus);
    }
}
