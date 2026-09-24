package com.daksh.springboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;
import com.daksh.springboard.security.JwtAuthenticationFilter;
import org.springframework.http.HttpMethod;
import com.daksh.springboard.security.OAuthSuccessHandler;


@Configuration
public class SecurityConfig {

    private final OAuthSuccessHandler oauthSuccessHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, OAuthSuccessHandler oauthSuccessHandler){
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.oauthSuccessHandler = oauthSuccessHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .requestMatchers("/", "/health", "/ping").permitAll()
        .requestMatchers("/auth/**").permitAll()
        .requestMatchers("/clips/history").authenticated()
        .requestMatchers("/clips", "/clips/**").permitAll()
        .requestMatchers("/file", "/files", "/file/**", "/files/**").permitAll()
        .requestMatchers("/error").permitAll()
        .anyRequest().authenticated()
       )
       
        .addFilterBefore(
            jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class
        )
        .oauth2Login(oauth2 -> oauth2.successHandler(oauthSuccessHandler));

    return http.build();
   }


   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(List.of(
        "http://localhost:5173",
        "http://localhost:3000",
        "https://tenchi-data.vercel.app",
        frontendUrl
    ));
    configuration.setAllowedMethods(List.of(
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}
