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

    public Integer setExpiryMinutes(){
        return expiryMinutes;
    }
    public void getExpiryMinutes(Integer expiryMinutes){
        this.expiryMinutes = expiryMinutes;
    }
}
