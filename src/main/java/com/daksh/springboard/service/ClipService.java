package com.daksh.springboard.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.model.Clip;
import java.util.*;

@Service
public class ClipService {

    private final List<Clip> clips = new ArrayList<>();

    public void createClip(CreateClipRequest request){
        Clip clip = new Clip();
        clip.setContent(request.getContent());
        clips.add(clip);
    
    }

    @GetMapping("/clips")
    public List<Clip> getAllClips(){
    return clips;

  }

}

