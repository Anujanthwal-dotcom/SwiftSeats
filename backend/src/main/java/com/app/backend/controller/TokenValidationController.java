package com.app.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class TokenValidationController {

    @GetMapping("/validateToken")
    public boolean validateToken(){
        return true;
    }
}
