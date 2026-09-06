package com.daksh.springboard.dto;

public class CreateClipRequest {
    
    private String content;
    private Integer expiryMinutes;

    public String getContent(){
        return content;
    }
    public void setContent(String content){
        this.content=content;
    }

    public Integer getExpiryMinutes(){
        return expiryMinutes;
    }
    public void setExpiryMinutes(Integer expiryMinutes){
        this.expiryMinutes = expiryMinutes;
    }
}
