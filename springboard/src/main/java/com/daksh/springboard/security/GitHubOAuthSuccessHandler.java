package com.daksh.springboard.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.daksh.springboard.entity.User;
import com.daksh.springboard.repository.UserRepository;
import com.daksh.springboard.service.AuthService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class GitHubOAuthSuccessHandler implements AuthenticationSuccessHandler {
    
    private final UserRepository userRepository;
    private final AuthService authService;

    public GitHubOAuthSuccessHandler(UserRepository userRepository, AuthService authService){
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @Override 
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");

            User user = userRepository.findByEmail(email)
                                      .orElseGet(() -> userRepository.save(
                                        new User(name, email, "")
                                      ));

            String token = authService.generateToken(user.getEmail());
            response.sendRedirect("http://localhost:5173?token=" + token);
        }
}
