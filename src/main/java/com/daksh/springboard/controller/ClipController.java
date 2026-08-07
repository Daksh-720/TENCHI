package com.daksh.springboard.controller;

// import org.apache.catalina.connector.Response;
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
import java.util.*;
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
        CreateClipResponse response = new CreateClipResponse(
            clip.getId(),
            clip.getShareCode(),
            "Clip Created Successfully!!"
        );
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/clips")
    public ResponseEntity<List<GetClipResponse>> getAllClips(){
        List<GetClipResponse> responses = new ArrayList<>();
        for(Clip clip : clipService.getAllClips()){
            responses.add(mapToGetClipResponse(clip));
        }
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/clips/{shareCode}")
    public ResponseEntity<GetClipResponse> getClipByShareCode(@PathVariable String shareCode){
        Clip clip = clipService.getClipByShareCode(shareCode);
        return ResponseEntity.ok(mapToGetClipResponse(clip));
    }


    @PutMapping("/clips/{id}")
    public ResponseEntity<GetClipResponse> updateClip(@PathVariable Long id, @RequestBody UpdateClipRequest request){
        Clip clip = clipService.updateClip(id, request);
        return ResponseEntity.ok(mapToGetClipResponse(clip));
    }


    @DeleteMapping("/clips/{id}")
    public ResponseEntity<String> deleteClip(@PathVariable Long id){
        clipService.deleteClip(id);
        return ResponseEntity.ok("Clip deleted Successfully!!");
    }


    private GetClipResponse mapToGetClipResponse(Clip clip){
        GetClipResponse response = new GetClipResponse();
        response.setId(clip.getId());
        response.setShareCode(clip.getShareCode());
        response.setContent(clip.getContent());
        response.setCreatedAt(clip.getCreatedAt());
        response.setExpiresAt(clip.getExpiresAt());
        return response;
    }

}
