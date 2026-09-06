package com.daksh.springboard.dto;



public class LoginResponse {

    private String username;
    private String email;
    private String token;

    public LoginResponse(String username, String email, String token) {
        this.username = username;
        this.email = email;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }
}
