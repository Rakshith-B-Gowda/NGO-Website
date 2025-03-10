package com.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.AuthRequest;
import com.entity.UserInfo;
import com.service.AuthUserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthUserService service;

    @GetMapping("/welcome")	
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/new")
    public String addNewUser(@Valid @RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }



    @PostMapping("/authenticate")		
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        return service.authenticateAndGetToken(authRequest);
    }
    
    @GetMapping("/getroles/{username}")	
    public String getRoles(@PathVariable String username){
    	return service.getRoles(username);
    }
    
}





