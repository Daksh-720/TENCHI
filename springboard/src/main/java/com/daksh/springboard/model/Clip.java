package com.daksh.springboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.time.LocalDateTime;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.daksh.springboard.entity.User;
// import com.daksh.springboard.model.clipFile;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Clip {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    private Long id;
    @Column(unique = true, length = 16)
    private String shareCode;
    private String content;
    @Enumerated(EnumType.STRING)
    private ContentType contentType;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private String fileName;
    private String filePath;
    private Long fileSize;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "clip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<clipFile> files = new ArrayList<>();

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

    public ContentType getContentType(){
        return contentType;
    }
    public void setContentType(ContentType contentType){
        this.contentType = contentType;
    }

    public String getFileName(){
        return fileName;
    }
    public void setFileName(String fileName){
        this.fileName = fileName;
    }

    public String getFilePath(){
        return filePath;
    }
    public void setFilePath(String filePath){
        this.filePath = filePath;
    }

    public Long getFileSize(){
        return fileSize;
    }
    public void setFileSize(Long fileSize){
        this.fileSize = fileSize;
    }

    public User getOwner(){
        return owner;
    }

    public void setOwner(User owner){
        this.owner = owner;
    }

    public List<clipFile> getFiles(){
        return files;
    }
    public void setFiles(List<clipFile> files){
        this.files = files;
    }
}
