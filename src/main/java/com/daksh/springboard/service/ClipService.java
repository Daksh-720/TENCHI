package com.daksh.springboard.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.daksh.springboard.dto.CreateClipRequest;
// import com.daksh.springboard.dto.GetClipResponse;
import com.daksh.springboard.dto.UpdateClipRequest;
import com.daksh.springboard.model.Clip;
import com.daksh.springboard.repository.ClipRepository;
import com.daksh.springboard.util.CodeGenerator;

import java.time.LocalDateTime;
import java.util.*;


@Service
public class ClipService {

    private final ClipRepository clipRepository;
    private final CodeGenerator codeGenerator;
    
    
    public ClipService(ClipRepository clipRepository, CodeGenerator codeGenerator){
      this.clipRepository = clipRepository;
      this.codeGenerator = codeGenerator;
    }


    public Clip createClip(CreateClipRequest request){
        Clip clip = new Clip();
        clip.setContent(request.getContent());
        LocalDateTime createdAt = LocalDateTime.now();
        clip.setCreatedAt(createdAt);
        Integer expiryMinutes = request.getExpiryMinutes();
        if(expiryMinutes == null){
          expiryMinutes = 15;
        }
        if(expiryMinutes < 1 || expiryMinutes > 2880){
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expiry must be between 1min or 2days");
        }
        clip.setExpiresAt(createdAt.plusMinutes(expiryMinutes));

        String shareCode;
        do{
          shareCode = codeGenerator.generate();
        }while(clipRepository.findByShareCode(shareCode).isPresent());
        clip.setShareCode(shareCode);
        return clipRepository.save(clip);
    }

    public List<Clip> getAllClips(){
    return clipRepository.findByExpiresAtAfter(LocalDateTime.now());
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

  public Clip getClipByShareCode(String shareCode){
    Clip clip = clipRepository.findByShareCode(shareCode)
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Data NOT FOUND!!"));

    if(clip.getExpiresAt().isBefore(LocalDateTime.now())) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CLIP HAS EXPIRED!!");
    }

    return clip;
  }
  

}
