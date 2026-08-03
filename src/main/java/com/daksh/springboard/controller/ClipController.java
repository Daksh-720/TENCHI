package com.daksh.springboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.daksh.springboard.dto.*;
import com.daksh.springboard.service.ClipService;
// import java.util.*;
import com.daksh.springboard.model.Clip;


@RestController
public class ClipController {
    private final ClipService clipService;

    public ClipController(ClipService clipService){
        this.clipService=clipService;
    }
    

    @PostMapping("/clips")
    public ResponseEntity<CreateClipResponse> createClip(@RequestBody CreateClipRequest request){
        Clip clip = clipService.createClip(request);
        CreateClipResponse response = new CreateClipResponse();

        response.setId(clip.getId());
        response.setMessage("Clip created Successfully");
        return ResponseEntity.status(201).body(response);
        
    }

    @GetMapping("/clips/{id}")
    public ResponseEntity<GetClipResponse> getClipById(@PathVariable Long id){
        Clip clip = clipService.getClipById(id);
        GetClipResponse response = new GetClipResponse();
        response.setId(clip.getId());
        response.setContent(clip.getContent());
        return ResponseEntity.ok(response);
    }


    @PutMapping("/clips/{id}")
    public ResponseEntity<GetClipResponse> updateClip(@PathVariable Long id, @RequestBody UpdateClipRequest request){
        return ResponseEntity.ok(clipService.updateClip(id, request));
    }

    @DeleteMapping("/clips/{id}")
    public ResponseEntity<String> deleteClip(@PathVariable Long id){
        clipService.deleteClip(id);
        return ResponseEntity.ok("Clip deleted Successfully!!");
    }

}
