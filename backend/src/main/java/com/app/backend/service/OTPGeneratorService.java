package com.app.backend.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class OTPGeneratorService {

    private final SecureRandom secureRandom = new SecureRandom();
    private final String DIGITS = "1234567890";


    public StringBuilder generate() {
        StringBuilder otp = new StringBuilder();

        //write the implementation for generating otp.
        for(int i=1;i<=6;i++){
            otp.append(DIGITS.charAt(secureRandom.nextInt(DIGITS.length())));
        }
        return otp;
    }

}

