package com.daksh.springboard.service;

import org.springframework.stereotype.Service;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.GetClipResponse;
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

    public List<GetClipResponse> getAllClips(){
    List<GetClipResponse> responses = new ArrayList<>();

    for(Clip clip : clips){
        GetClipResponse response = new GetClipResponse();
        response.setContent(clip.getContent());
        responses.add(response);
    }

    return responses;
  }

}

