package com.daksh.springboard.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.service.ClipService;

@RestController
public class ClipController {

    private final ClipService clipService;

    public ClipController(ClipService clipService){
        this.clipService=clipService;
    }
    
    @PostMapping("/clips")
    public void createClip(@RequestBody CreateClipRequest request){
        clipService.createClip(request);
    }
}
