package com.app.backend.controller;

import com.app.backend.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class OTPController {

    @Autowired
    private OTPService otpService;

    @PostMapping("/generateOTP")
    public ResponseEntity<Boolean> generateOTP(@RequestParam("email") String email){
        boolean response = otpService.generate(email);

        if(response){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }

    @PostMapping("/verifyOTP")
    public ResponseEntity<Boolean> verifyOTP(@RequestParam("email") String email,@RequestParam("otp") String otp){
        return otpService.verifyOTP(email,otp,LocalDateTime.now());
    }

}
