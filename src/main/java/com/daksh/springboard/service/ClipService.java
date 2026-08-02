package com.daksh.springboard.service;

import org.springframework.stereotype.Service;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.GetClipResponse;
import com.daksh.springboard.model.Clip;
import java.util.*;


@Service
public class ClipService {

    private final List<Clip> clips = new ArrayList<>();
    private Long nextId=1L;

    public void createClip(CreateClipRequest request){
        Clip clip = new Clip();
        clip.setId(nextId);

        nextId++;

        clip.setContent(request.getContent());
        clips.add(clip);
    
    }

    public List<GetClipResponse> getAllClips(){
    List<GetClipResponse> responses = new ArrayList<>();

    for(Clip clip : clips){
        GetClipResponse response = new GetClipResponse();
        response.setId(clip.getId());
        response.setContent(clip.getContent());
        responses.add(response);
    }

    return responses;
  }

  public GetClipResponse getClipById(Long id){
    for(Clip clip : clips){
        if(clip.getId().equals(id)){
            GetClipResponse response = new GetClipResponse();
            response.setId(clip.getId());
            response.setContent(clip.getContent());
            return response;
        }

    }
    
    throw new RuntimeException("Clip not Found!");
  }

}

