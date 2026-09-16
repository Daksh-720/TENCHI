package com.daksh.springboard.security;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.daksh.springboard.entity.User;
import com.daksh.springboard.repository.UserRepository;
import com.daksh.springboard.service.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final OAuth2AuthorizedClientService authorizedClientService;

    public OAuthSuccessHandler(UserRepository userRepository,
                               JwtService jwtService,
                               OAuth2AuthorizedClientService authorizedClientService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authorizedClientService = authorizedClientService;
    }
    
    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

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

                // GitHub users with private emails return null on /user endpoint.
                // Fetch primary verified email from https://api.github.com/user/emails
                if (email == null) {
                    email = fetchGithubEmail(oauthToken);
                }

                // Fallback if still null
                if (email == null) {
                    String login = oauthUser.getAttribute("login");
                    if (login != null) {
                        email = login + "@users.noreply.github.com";
                    }
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

    private String fetchGithubEmail(OAuth2AuthenticationToken oauthToken) {
        try {
            OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName()
            );

            if (client == null || client.getAccessToken() == null) {
                return null;
            }

            String accessToken = client.getAccessToken().getTokenValue();
            HttpRequest emailReq = HttpRequest.newBuilder()
                .uri(URI.create("https://api.github.com/user/emails"))
                .header("Authorization", "Bearer " + accessToken)
                .header("Accept", "application/vnd.github+json")
                .header("User-Agent", "springboard")
                .GET()
                .build();

            HttpResponse<String> resp = HttpClient.newHttpClient()
                .send(emailReq, HttpResponse.BodyHandlers.ofString());

            if (resp.statusCode() == 200) {
                String body = resp.body();
                // Find primary verified email
                Pattern primaryPattern = Pattern.compile(
                    "\\{[^}]*\"email\"\\s*:\\s*\"([^\"]+)\"[^}]*\"primary\"\\s*:\\s*true[^}]*\\}"
                );
                Matcher m = primaryPattern.matcher(body);
                if (m.find()) {
                    return m.group(1);
                }

                // Fallback to any email found
                Pattern anyEmailPattern = Pattern.compile("\"email\"\\s*:\\s*\"([^\"]+)\"");
                m = anyEmailPattern.matcher(body);
                if (m.find()) {
                    return m.group(1);
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch GitHub email: " + e.getMessage());
        }
        return null;
    }
}
