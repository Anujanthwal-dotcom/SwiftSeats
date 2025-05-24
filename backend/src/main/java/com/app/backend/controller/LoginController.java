package com.app.backend.controller;

import com.app.backend.model.User;
import com.app.backend.response.LoginResponse;
import com.app.backend.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {


    @Autowired
    private UserDetailService userDetailService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user){
        LoginResponse loginResponse = userDetailService.verify(user);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

}
