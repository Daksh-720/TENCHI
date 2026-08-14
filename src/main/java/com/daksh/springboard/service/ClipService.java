package com.daksh.springboard.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.FileInfo;
// import com.daksh.springboard.dto.GetClipResponse;
import com.daksh.springboard.dto.UpdateClipRequest;
import com.daksh.springboard.model.Clip;
import com.daksh.springboard.model.ContentType;
import com.daksh.springboard.model.clipFile;
import com.daksh.springboard.repository.ClipRepository;
import com.daksh.springboard.util.CodeGenerator;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.nio.file.*;


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
        clip.setContentType(ContentType.TEXT);
        
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


  public Resource getFile(Clip clip){
    if(clip.getFiles().isEmpty()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File Not Found");
    }
    clipFile file = clip.getFiles().get(0);
    Path filePath = Paths.get(file.getFilePath());
    return new FileSystemResource(filePath);
  }


  public Resource getFileById(Clip clip, Long fileId){
    clipFile file = clip.getFiles()
                        .stream()
                        .filter(f -> f.getId().equals(fileId))
                        .findFirst()
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FILE NOT FOUND!"));

    
    Path filePath = Paths.get(file.getFilePath());
    Resource resource = new FileSystemResource(filePath);
    if(!resource.exists()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "FILE NOT FOUND!");
    }
    return resource;
  }
  

  public FileInfo saveFile(MultipartFile file){
    try{
      Path uploadPath = Paths.get("uploads");
      String originalFileName = file.getOriginalFilename();
      String extension = "";
      if(originalFileName != null && originalFileName.contains(".")){
        extension = originalFileName.substring(originalFileName.lastIndexOf("."));
      }
      String storedFileName = UUID.randomUUID() + extension;
      Path filePath = uploadPath.resolve(storedFileName);
      if(!Files.exists(uploadPath)){
        Files.createDirectories(uploadPath);
      }
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
      long fileSize = Files.size(filePath);
      return new FileInfo(originalFileName,filePath.toString(),fileSize);

    }catch(IOException e){
      throw new RuntimeException("Failed to Create upload Directory", e);
    }
  }


  public Clip createFileClip(MultipartFile file, Integer expiryMinutes){
    FileInfo fileInfo = saveFile(file);
    Clip clip = new Clip();
    clipFile clipFile = new clipFile();
    clip.setContentType(getFileContentType(file));
    clipFile.setFileName(fileInfo.getFileName());
    clipFile.setFilePath(fileInfo.getFilePath());
    clipFile.setFileSize(fileInfo.getFileSize());
    clipFile.setClip(clip);
    clip.getFiles().add(clipFile);
    LocalDateTime createdAt = LocalDateTime.now();
    clip.setCreatedAt(createdAt);
    if(expiryMinutes == null){
      expiryMinutes = 15;
    }
    if(expiryMinutes<1 || expiryMinutes>2880){
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


  public Clip createMultipleFileClip(MultipartFile[] files, Integer expiryMinutes){
    Clip clip = new Clip();
    clip.setContentType(ContentType.FILE);
    LocalDateTime createdAt = LocalDateTime.now();
    clip.setCreatedAt(createdAt);
    if(expiryMinutes == null){
      expiryMinutes = 15;
    }
    if(expiryMinutes<1 || expiryMinutes>2880){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expiry must be between 1min or 2days");
    }
    clip.setExpiresAt(createdAt.plusMinutes(expiryMinutes));
    String shareCode;
    do {
      shareCode = codeGenerator.generate();
    }while(clipRepository.findByShareCode(shareCode).isPresent());
    clip.setShareCode(shareCode);
    for(MultipartFile file : files){
      FileInfo fileInfo = saveFile(file);
      clipFile clipFile = new clipFile();
      clipFile.setFileName(fileInfo.getFileName());
      clipFile.setFilePath(fileInfo.getFilePath());
      clipFile.setFileSize(fileInfo.getFileSize());
      clipFile.setClip(clip);
      clip.getFiles().add(clipFile);
    }
    return clipRepository.save(clip);
  }


  private ContentType getFileContentType(MultipartFile file){
    String contentType = file.getContentType();
    if(contentType == null){
      return ContentType.FILE;
    }
    if(contentType.startsWith("image/")){
      return ContentType.IMAGE;
    }
    if(contentType.startsWith("video/")){
      return ContentType.VIDEO;
    }
    return ContentType.FILE;
  }
}
