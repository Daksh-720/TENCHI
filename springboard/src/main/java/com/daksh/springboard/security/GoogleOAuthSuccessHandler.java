package com.daksh.springboard.security;

import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler{
    @Override
     public void onAuthenticationSuccess(
             HttpServletRequest request,
             HttpServletResponse response,
             Authentication authentication)
             throws IOException, ServletException {
     
         OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
         String email = oauthUser.getAttribute("email");
         String name = oauthUser.getAttribute("name");
         
    }
}
