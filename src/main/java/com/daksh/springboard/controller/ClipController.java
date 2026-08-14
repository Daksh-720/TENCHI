package com.daksh.springboard.controller;

// import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.daksh.springboard.dto.CreateClipRequest;
import com.daksh.springboard.dto.CreateClipResponse;
// import com.daksh.springboard.dto.FileInfo;
import com.daksh.springboard.dto.GetClipResponse;
import com.daksh.springboard.dto.UpdateClipRequest;
import com.daksh.springboard.service.ClipService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import java.util.*;
import com.daksh.springboard.model.Clip;
import com.daksh.springboard.model.clipFile;


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
        response.setContentType(clip.getContentType());
        response.setCreatedAt(clip.getCreatedAt());
        response.setExpiresAt(clip.getExpiresAt());

        if(!clip.getFiles().isEmpty()){
            clipFile file = clip.getFiles().get(0);
            response.setFileName(file.getFileName());
            response.setFilePath(file.getFilePath());
            response.setFileSize(file.getFileSize());
        }
        return response;
    }


    @PostMapping("/file")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam(required = false)Integer expiryMinutes){
        Clip clip = clipService.createFileClip(file, expiryMinutes);
        return ResponseEntity.ok("File Saved :" + clip.getFiles().get(0).getFilePath());
    }


    @PostMapping("/files")
    public ResponseEntity<String> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @RequestParam(required = false) Integer expiryMinutes){
        Clip clip = clipService.createMultipleFileClip(files, expiryMinutes);
        return ResponseEntity.ok("Files saved. share code" + clip.getShareCode());
    }


    @GetMapping("/clips/{shareCode}/download")
    public ResponseEntity<Resource> download(@PathVariable String shareCode){
        Clip clip = clipService.getClipByShareCode(shareCode);
        Resource resource = clipService.getFile(clip);
        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + clip.getFileName() + "\"")
                             .body(resource);
    }


    @GetMapping("/clips/{shareCode}/files/{fileId}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable String shareCode, @PathVariable Long fileId){
        Clip clip = clipService.getClipByShareCode(shareCode);
        Resource resource = clipService.getFileById(clip, fileId);
        clipFile file = clip.getFiles()
                            .stream()
                            .filter(f -> f.getId().equals(fileId))
                            .findFirst()
                            .orElseThrow();
                        
        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileNname=\"" + file.getFileName() + "\"")
                             .body(resource);
    }

}
