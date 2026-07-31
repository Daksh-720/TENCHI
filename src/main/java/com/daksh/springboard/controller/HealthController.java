package com.daksh.springboard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.daksh.springboard.service.ClipService;

@RestController
public class HealthController {

    private final ClipService clipService;

    public HealthController(ClipService clipService){
        this.clipService=clipService;
        System.out.println("HealthController created");
    }


    @GetMapping("/")
    public String health(){
        return clipService.message();
    }
}
