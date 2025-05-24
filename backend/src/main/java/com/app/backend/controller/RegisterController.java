package com.app.backend.controller;


import com.app.backend.model.User;
import com.app.backend.response.RegisterResponse;
import com.app.backend.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {


    @Autowired
    private UserDetailService userDetailService;


    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody User user){
        RegisterResponse registerResponse = userDetailService.register(user);

        return new ResponseEntity<>(registerResponse, HttpStatus.OK);
    }



}
