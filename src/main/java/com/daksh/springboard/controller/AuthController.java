package com.daksh.springboard.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.daksh.springboard.dto.RegisterResponse;
import com.daksh.springboard.entity.User;
import com.daksh.springboard.dto.LoginRequest;
import com.daksh.springboard.dto.RegisterRequest;
import com.daksh.springboard.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService){
        this.authService = authService;
    }


    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request){
        User user = authService.register(request.getUsername(), request.getEmail(), request.getPassword());
        return new RegisterResponse(user.getUsername(), user.getEmail());
    }


    @PostMapping("/login")
    public RegisterResponse login(@RequestBody LoginRequest request){
        User user = authService.login(request.getEmail(), request.getPassword());
        return new RegisterResponse(user.getUsername(), user.getEmail());
    }
}
