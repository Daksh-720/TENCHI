package com.daksh.springboard.security;

import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import com.daksh.springboard.repository.UserRepository;
import com.daksh.springboard.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.daksh.springboard.entity.User;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public OAuthSuccessHandler(UserRepository userRepository, JwtService jwtService){
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    
    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException{

            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            String provider = oauthToken.getAuthorizedClientRegistrationId();

            String email = null;
            String name = null;
            
            if ("google".equalsIgnoreCase(provider)) {
                email = oauthUser.getAttribute("email");
                name = oauthUser.getAttribute("name");
            } else if ("github".equalsIgnoreCase(provider)) {
                email = oauthUser.getAttribute("email");
                name = oauthUser.getAttribute("name");
                if (name == null) {
                    name = oauthUser.getAttribute("login");
                }
            }

            if (email == null) {
                response.sendError(
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Email could not be retrieved from OAuth provider"
                );
                return;
            }

            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                String username = name != null ? name : email;
                user = userRepository.save(new User(username, email, ""));
            }

            String token = jwtService.generateToken(user.getEmail());
            response.sendRedirect("http://localhost:5173?token=" + token);
        }
}
