package com.daksh.springboard.dto;

import java.time.LocalDateTime;
import com.daksh.springboard.model.ContentType;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "content"})
public class GetClipResponse {
    
    private Long id;
    private String content;
    private String shareCode;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private String fileName;
    private String filePath;
    private Long fileSize;
    private ContentType contentType;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public String getContent(){
        return content;
    }
    public void setContent(String content){
        this.content = content;
    }

    public String getShareCode(){
        return shareCode;
    }
    public void setShareCode(String shareCode){
        this.shareCode = shareCode;
    }

     public LocalDateTime getCreatedAt(){
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt(){
        return expiresAt;
    }
    public void setExpiresAt(LocalDateTime expiresAt){
        this.expiresAt = expiresAt;
    }

    public String getFileName(){
        return fileName;
    }
    public void setFileName(String fileName){
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }
    public void setFilePath(String filePath) {
       this.filePath = filePath;
    }

    public Long getFileSize() {
        return fileSize;
    }
    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public ContentType getContentType(){
        return contentType;
    }
    public void setContentType(ContentType contentType){
        this.contentType = contentType;
    }
}
