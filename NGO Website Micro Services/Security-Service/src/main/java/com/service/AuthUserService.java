// AuthUserService.java
package com.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dto.AuthRequest;
import com.entity.UserInfo;
import com.exception.ResourceNotFoundException;
import com.exception.UserAlreadyExistsException;
import com.repository.UserInfoRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AuthUserService {

    private UserInfoRepository repository;

    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private JwtService jwtService;

    public String addUser(UserInfo userInfo) {

        repository.findByUserEmail(userInfo.getUserEmail()).ifPresent(existingUser -> {
            throw new UserAlreadyExistsException("Email already exists for user");
        });

        String name = userInfo.getUserName();
        UserInfo existingUser = repository.findByUserName(name).orElse(null);
        System.out.println("Existing User: " + existingUser);
        if (existingUser == null) {
            userInfo.setUserPassword(passwordEncoder.encode(userInfo.getUserPassword()));
            repository.save(userInfo);
            return "Registration successful";
        } else {
            throw new UserAlreadyExistsException("Username already exists for user");
        }
    }

    public String authenticateAndGetToken(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            UserInfo user = repository.findByUserName(authRequest.getUsername())
                                      .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
            return jwtService.generateToken(authRequest.getUsername(), user.getRoles(), user.getUserId());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    public String getRoles(String username) {
        UserInfo user = repository.findByUserName(username).orElse(null);
        if (user != null) {
            return user.getRoles();
        }
        throw new ResourceNotFoundException("User", "Username", username);
    }
}
