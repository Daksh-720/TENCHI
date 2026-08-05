package com.daksh.springboard.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.GetClipResponse;
import com.daksh.springboard.dto.UpdateClipRequest;
import com.daksh.springboard.model.Clip;
import com.daksh.springboard.repository.ClipRepository;

import java.util.*;


@Service
public class ClipService {

    private final ClipRepository clipRepository;
    
    public ClipService(ClipRepository clipRepository){
      this.clipRepository = clipRepository;
    }


    public Clip createClip(CreateClipRequest request){
        Clip clip = new Clip();
        clip.setContent(request.getContent());
        return clipRepository.save(clip);
    }

    public List<Clip> getAllClips(){
    return clipRepository.findAll();
  }


  public Clip getClipById(Long id){
    return clipRepository.findById(id)
                         .orElseThrow(()->new ResponseStatusException
                         (HttpStatus.NOT_FOUND, "Clip not found"));
    }
  


  public Clip updateClip(Long id, UpdateClipRequest request){
     Clip clip = getClipById(id);
     clip.setContent(request.getContent());
     return clipRepository.save(clip);
    }


  public void deleteClip(Long id){
    clipRepository.deleteById(getClipById(id).getId());
  }

}
