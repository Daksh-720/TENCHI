package com.daksh.springboard.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.daksh.springboard.dto.CreateClipRequest;

@RestController
public class ClipController {
    
    @PostMapping("/clips")
    public void createClip(@RequestBody CreateClipRequest request){
        System.out.println(request.getContent());
    }
}
