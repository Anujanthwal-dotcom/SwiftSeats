package com.app.backend.controller;

import com.app.backend.model.Bus;
import com.app.backend.service.BusService;
import com.app.backend.service.JwtService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BusController {
    @Autowired
    private BusService busService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/search/{from}/{to}/{date}")
    public ResponseEntity<List<Bus>> getBuses(@PathVariable("from") String from,@PathVariable("to") String to,@PathVariable("date") String date){
        LocalDate localDate = LocalDate.parse(date);
        DayOfWeek dayOfWeek = localDate.getDayOfWeek();

        List<Bus> buses = busService.get(from,to,dayOfWeek);

        if(buses==null){
            buses = new ArrayList<>();
        }
        return new ResponseEntity<>(buses, HttpStatus.OK);
    }

    @GetMapping("/getAllBuses")
    public ResponseEntity<List<Bus>> getAll(){
        List<Bus> buses = busService.getAll();

        if(buses==null){
            buses = new ArrayList<>();
        }
        return new ResponseEntity<>(buses,HttpStatus.OK);
    }

    @GetMapping("/getAdminBuses")
    public ResponseEntity<List<Bus>> getAdminBuses(@RequestHeader("Authorization") String token){
        if(token!=null && token.startsWith("Bearer")){
            token = token.substring(7);
        }
        else {
            return new ResponseEntity<>(null,HttpStatus.OK);
        }


        String email = jwtService.extractEmail(token);

        List<Bus> buses=busService.getAdminBuses(email);

        if(buses==null){
            buses = new ArrayList<>();
        }

        return new ResponseEntity<>(buses,HttpStatus.OK);
    }

    @PostMapping("/addBus")
    public ResponseEntity<Boolean> addBus(@RequestHeader("Authorization") String token,@RequestBody Bus bus){
        if(token!=null && token.startsWith("Bearer")){
            token = token.substring(7);
        }
        else{
            return new ResponseEntity<>(false,HttpStatus.OK);
        }

        String email = jwtService.extractEmail(token);
        boolean response = busService.add(email,bus);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/manageBus")
    public ResponseEntity<Boolean> manageBus(@RequestBody Bus bus){
        boolean response = busService.manage(bus);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/deleteBus/{id}")
    public void deleteBus(@PathVariable("id") String id, @RequestHeader("Authorization") String token){
        if(token!=null && token.startsWith("Bearer")){
            token = token.substring(7);
        }
        String email = jwtService.extractEmail(token);
        ObjectId busId = new ObjectId(id);
        busService.delete(email,busId);
    }

}
