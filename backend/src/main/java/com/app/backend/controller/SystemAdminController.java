package com.app.backend.controller;

import com.app.backend.model.User;
import com.app.backend.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SystemAdminController {

    @Autowired
    private UserDetailService userDetailService;

    @GetMapping("/systemAdmin/allUsers")
    public List<User> getAll(){
        return userDetailService.getAll();
    }


}
