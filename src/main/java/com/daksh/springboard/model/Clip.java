package com.daksh.springboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Clip {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    private Long id;
    private String shareCode;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
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
}
