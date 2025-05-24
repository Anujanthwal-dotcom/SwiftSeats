package com.app.backend.service;

import com.app.backend.model.OTP;
import com.app.backend.model.User;
import com.app.backend.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OTPService {

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OTPGeneratorService otpGeneratorService;

    @Autowired
    private UserDetailService userDetailService;

    public boolean generate(String email) {

        User dbUser = userDetailService.find(email);

        if(dbUser!=null){
            System.out.println(dbUser);
            return false;
        }

        otpRepository.deleteByEmail(email);
        //generating OTP(6 digit OTP)
        StringBuilder otp = otpGeneratorService.generate();



        OTP otpObject = new OTP();
        otpObject.setEmail(email);
        otpObject.setOtp(otp.toString());
        otpObject.setTimestamp(LocalDateTime.now().plusMinutes(11));
        OTP dbOTP = otpRepository.save(otpObject);

        if(dbOTP!=null){
            System.out.println("OTP generated");
            emailService.sendEmail(email,"OTP for ApniTrain","Your otp for verification is - "+dbOTP.getOtp());
            return true;
        }
        else{
            System.out.println("Error in saving OTP object");
            return false;
        }
    }

    public ResponseEntity<Boolean> verifyOTP(String email, String otp,LocalDateTime current) {
        OTP dbOTP = otpRepository.findByEmail(email);

        if(dbOTP!=null){
            if(dbOTP.getOtp().equals(otp) && dbOTP.getTimestamp().isAfter(current)){
                otpRepository.deleteById(dbOTP.getId());
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(false,HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else{
            return new ResponseEntity<>(false,HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
