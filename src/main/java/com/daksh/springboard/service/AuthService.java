package com.daksh.springboard.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.daksh.springboard.entity.User;
import com.daksh.springboard.exception.DuplicateEmailException;
import com.daksh.springboard.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService (UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User register(String username, String email, String password){
        if(userRepository.findByEmail(email).isPresent()){
            throw new DuplicateEmailException("Email already registered!");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, email, hashedPassword);
        return userRepository.save(user);
    }
}
