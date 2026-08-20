package com.daksh.springboard.service;

import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {
    private final SecretKey secretKey = Keys.hmacShaKeyFor("your-secret-key-must-be-at-least-32-characters".getBytes());
    public String generateToken(String email){
        return Jwts.builder()
                   .subject(email)
                   .signWith(secretKey, Jwts.SIG.HS256)
                   .compact();
    }


    public String extractEmail(String token){
        return Jwts.parser()
                   .verifyWith(secretKey)
                   .build()
                   .parseSignedClaims(token)
                   .getPayload()
                   .getSubject();
    }
}