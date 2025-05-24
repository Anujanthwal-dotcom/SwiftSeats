package com.app.backend.controller;

import com.app.backend.model.Bus;
import com.app.backend.model.User;
import com.app.backend.service.JwtService;
import com.app.backend.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailService userDetailService;

    @GetMapping("/user/getBookedBuses")
    public ResponseEntity<List<Bus>> getBookedBuses(@RequestHeader("Authorization") String token){
        token = token.substring(7).trim();

        String email = jwtService.extractEmail(token);

        User user = userDetailService.find(email);
        List<Bus> bookedBuses = user.getBookedBuses();
        if (bookedBuses == null) {
            bookedBuses = new ArrayList<>();
        }
        return new ResponseEntity<>(bookedBuses,HttpStatus.OK);
    }

    @GetMapping("/user/getCancelledBuses")
    public ResponseEntity<List<Bus>> getCancelledBuses(@RequestHeader("Authorization") String token){
        token = token.substring(7).trim();
        String email = jwtService.extractEmail(token);

        User user = userDetailService.find(email);
        List<Bus> cancelledBuses = user.getCancelledBuses();

        if(cancelledBuses==null){
            cancelledBuses = new ArrayList<>();
        }
        return new ResponseEntity<>(user.getCancelledBuses(),HttpStatus.OK);
    }

    @PostMapping("/bookBus")
    public ResponseEntity<Boolean> bookBus(@RequestBody Bus bus,@RequestHeader("Authorization") String token){
        if(token !=null && token.startsWith("Bearer")){
            token = token.substring(7);
        }

        String email = jwtService.extractEmail(token);

        boolean response = userDetailService.book(email,bus);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/cancelBus")
    public ResponseEntity<List<Bus>> cancelBus(@RequestHeader("Authorization") String token,@RequestBody Bus bus){
        if(token!=null && token.startsWith("Bearer")){
            token = token.substring(7);
        }

        String email = jwtService.extractEmail(token);

        List<Bus> buses = userDetailService.cancel(email,bus);

        return new ResponseEntity<>(buses,HttpStatus.OK);
    }
}
