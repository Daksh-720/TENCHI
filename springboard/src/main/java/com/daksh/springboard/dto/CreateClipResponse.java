package com.daksh.springboard.dto;

public class CreateClipResponse {

    private String shareCode;
    private String message;

    public String getMessage(){
        return message;
    }
    public void setMessage(String message){
        this.message = message;
    }

    public String getShareCode(){
        return shareCode;
    }
    public void setShareCode(String shareCode){
        this.shareCode = shareCode;
    }

    public CreateClipResponse(String shareCode, String message){
        this.shareCode = shareCode;
        this.message = message;
    }
}
