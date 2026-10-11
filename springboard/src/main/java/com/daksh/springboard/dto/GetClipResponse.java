package com.daksh.springboard.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.daksh.springboard.model.ContentType;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"shareCode", "content"})
public class GetClipResponse {
    
    private String content;
    private String shareCode;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private List<FileResponse> files;
    private ContentType contentType;

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

    public List<FileResponse> getFiles(){
        return files;
    }
    public void setFiles(List<FileResponse> files){
        this.files = files;
    }

    public ContentType getContentType(){
        return contentType;
    }
    public void setContentType(ContentType contentType){
        this.contentType = contentType;
    }
}
