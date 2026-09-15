package com.daksh.springboard.config;

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
        .requestMatchers("/auth/**").permitAll()
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
    configuration.setAllowedOrigins(List.of(
        "http://localhost:5173"
    ));
    configuration.setAllowedMethods(List.of(
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ));
    configuration.setAllowedHeaders(List.of("*"));
    UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}
