package com.daksh.springboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.daksh.springboard.dto.CreateClipResponse;
import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.service.ClipService;
import com.daksh.springboard.dto.GetClipResponse;
// import java.util.*;


@RestController
public class ClipController {
    private final ClipService clipService;

    public ClipController(ClipService clipService){
        this.clipService=clipService;
    }
    

    @PostMapping("/clips")
    public ResponseEntity<CreateClipResponse> createClip(@RequestBody CreateClipRequest request){
        clipService.createClip(request);

        CreateClipResponse response = new CreateClipResponse();
        response.setMessage("Clip created Successfully");
        return ResponseEntity.status(201).body(response);
        
    }

    @GetMapping("/clips/{id}")
    public ResponseEntity<GetClipResponse> getClipById(@PathVariable Long id){
        return ResponseEntity.ok(clipService.getClipById(id));
    }
}
