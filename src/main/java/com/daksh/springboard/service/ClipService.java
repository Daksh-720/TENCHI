package com.daksh.springboard.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.GetClipResponse;
import com.daksh.springboard.dto.UpdateClipRequest;
import com.daksh.springboard.model.Clip;
import java.util.*;


@Service
public class ClipService {

    private final List<Clip> clips = new ArrayList<>();
    private Long nextId=1L;

    public Clip createClip(CreateClipRequest request){
        Clip clip = new Clip();
        clip.setId(nextId);

        nextId++;

        clip.setContent(request.getContent());
        clips.add(clip);

        return clip;    
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


  public Clip getClipById(Long id){
    for(Clip clip : clips){
        if(clip.getId().equals(id)){
           return clip;
        }
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Clip Not Found!");
  }


  public GetClipResponse updateClip(Long id, UpdateClipRequest request){

    for(Clip clip : clips){
        if(clip.getId().equals(id)){
            clip.setContent(request.getContent());
            GetClipResponse response = new GetClipResponse();
            response.setId(clip.getId());
            response.setContent(clip.getContent());
            return response;
        }
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Clip Not Found!");
  }


  public void deleteClip(Long id){
    Clip clip = getClipById(id);
    clips.remove(clip);
  }

}

