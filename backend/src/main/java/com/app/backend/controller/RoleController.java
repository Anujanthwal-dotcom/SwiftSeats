package com.app.backend.controller;

import com.app.backend.model.User;
import com.app.backend.service.JwtService;
import com.app.backend.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailService userDetailService;

    @GetMapping("/role")
    public String getRole(@RequestHeader("Authorization") String token){

        if(!token.startsWith("Bearer")){
            throw new RuntimeException("JWT token is not valid");
        }

        String extractedJwt = token.substring(7);

        String email = jwtService.extractEmail(extractedJwt);

        User user = userDetailService.loadUserByUsername(email);

        if(user==null){
            throw new RuntimeException("User is not found");
        }
        return user.getRole();
    }

}
