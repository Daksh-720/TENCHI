package com.daksh.springboard.dto;

public class CreateClipRequest {
    
    private String content;
    private Integer expiryMinutes;
    private String shareCode;

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

    public String getShareCode(){
        return shareCode;
    }
    public void setShareCode(String shareCode){
        this.shareCode = shareCode;
    }
}
