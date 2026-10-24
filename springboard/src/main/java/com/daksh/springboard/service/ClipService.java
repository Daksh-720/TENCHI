package com.daksh.springboard.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.FileInfo;
import com.daksh.springboard.dto.UpdateClipRequest;
import com.daksh.springboard.model.Clip;
import com.daksh.springboard.model.ContentType;
import com.daksh.springboard.model.clipFile;
import com.daksh.springboard.repository.ClipRepository;
import com.daksh.springboard.util.CodeGenerator;
import com.daksh.springboard.entity.User;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class ClipService {

    private final ClipRepository clipRepository;
    private final CodeGenerator codeGenerator;
    private final StorageService storageService;

    public ClipService(ClipRepository clipRepository, CodeGenerator codeGenerator, StorageService storageService){
      this.clipRepository = clipRepository;
      this.codeGenerator = codeGenerator;
      this.storageService = storageService;
    }


    public Clip createClip(CreateClipRequest request){
      return createClip(request, null);
    }

    public Clip createClip(CreateClipRequest request, User owner){
        Clip clip = new Clip();
      clip.setOwner(owner);
        clip.setContent(request.getContent());
        clip.setContentType(ContentType.TEXT);
        
        LocalDateTime createdAt = LocalDateTime.now();
        clip.setCreatedAt(createdAt);
        Integer expiryMinutes = request.getExpiryMinutes();
        if(expiryMinutes == null){
          expiryMinutes = 15;
        }
        if(expiryMinutes < 1 || expiryMinutes > 10080){
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expiry must be between 1min or 7days");
        }
        clip.setExpiresAt(createdAt.plusMinutes(expiryMinutes));
        clip.setShareCode(resolveShareCode(request.getShareCode()));
        return clipRepository.save(clip);
    }

    private String resolveShareCode(String candidateCode){
        if(candidateCode != null && candidateCode.matches("^[a-zA-Z0-9]{6}$") && clipRepository.findByShareCode(candidateCode).isEmpty()){
            return candidateCode;
        }
        String shareCode;
        do{
            shareCode = codeGenerator.generate();
        }while(clipRepository.findByShareCode(shareCode).isPresent());
        return shareCode;
    }

    public List<Clip> getAllClips(){
    return clipRepository.findByExpiresAtAfter(LocalDateTime.now());
  }

    public List<Clip> getHistory(User owner){
      return clipRepository.findByOwnerAndExpiresAtAfterOrderByCreatedAtDesc(owner, LocalDateTime.now());
    }


  public Clip getClipById(Long id){
    return clipRepository.findById(id)
                         .orElseThrow(()->new ResponseStatusException
                         (HttpStatus.NOT_FOUND, "Clip not found"));
    }
  


  public Clip updateClip(String shareCode, UpdateClipRequest request, User user){
     Clip clip = getClipByShareCode(shareCode);
     if(clip.getOwner() == null || user == null || !clip.getOwner().getId().equals(user.getId())){
         throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this clip!");
     }
     clip.setContent(request.getContent());
     return clipRepository.save(clip);
  }


  public void deleteClip(Long id){
    Clip clip = getClipById(id);
    if (clip.getFiles() != null) {
      for (clipFile file : clip.getFiles()) {
        storageService.deleteFile(file.getFilePath());
      }
    }
    clipRepository.deleteById(clip.getId());
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
    return storageService.getFile(file.getFilePath());
  }


  public Resource getFileById(Clip clip, Long fileId){
    clipFile file = clip.getFiles()
                        .stream()
                        .filter(f -> f.getId().equals(fileId))
                        .findFirst()
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FILE NOT FOUND!"));

    return storageService.getFile(file.getFilePath());
  }
  

  public FileInfo saveFile(MultipartFile file){
    return storageService.upload(file);
  }


  public Clip createFileClip(MultipartFile file, Integer expiryMinutes){
    return createFileClip(file, expiryMinutes, null);
  }

  public Clip createFileClip(MultipartFile file, Integer expiryMinutes, User owner){
    return createFileClip(file, expiryMinutes, null, owner);
  }

  public Clip createFileClip(MultipartFile file, Integer expiryMinutes, String shareCode, User owner){
    FileInfo fileInfo = saveFile(file);
    Clip clip = new Clip();
    clip.setOwner(owner);
    clipFile clipFile = new clipFile();
    clipFile.setContentType(getFileContentType(file));
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
    if(expiryMinutes<1 || expiryMinutes>10080){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expiry must be between 1min or 7days");
    }
    clip.setExpiresAt(createdAt.plusMinutes(expiryMinutes));
    clip.setShareCode(resolveShareCode(shareCode));
    return clipRepository.save(clip);
  }


  public Clip createMultipleFileClip(MultipartFile[] files, Integer expiryMinutes){
    return createMultipleFileClip(files, expiryMinutes, null, null);
  }

  public Clip createMultipleFileClip(MultipartFile[] files, Integer expiryMinutes, User owner){
    return createMultipleFileClip(files, expiryMinutes, null, owner);
  }

  public Clip createMultipleFileClip(MultipartFile[] files, Integer expiryMinutes, String shareCode, User owner){
    Clip clip = new Clip();
    clip.setOwner(owner);
    clip.setContentType(ContentType.FILE);
    LocalDateTime createdAt = LocalDateTime.now();
    clip.setCreatedAt(createdAt);
    if(expiryMinutes == null){
      expiryMinutes = 15;
    }
    if(expiryMinutes<1 || expiryMinutes>10080){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expiry must be between 1min or 7days");
    }
    clip.setExpiresAt(createdAt.plusMinutes(expiryMinutes));
    clip.setShareCode(resolveShareCode(shareCode));
    for(MultipartFile file : files){
      FileInfo fileInfo = saveFile(file);
      clipFile clipFile = new clipFile();
      clipFile.setFileName(fileInfo.getFileName());
      clipFile.setFilePath(fileInfo.getFilePath());
      clipFile.setFileSize(fileInfo.getFileSize());
      clipFile.setContentType(getFileContentType(file));
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
