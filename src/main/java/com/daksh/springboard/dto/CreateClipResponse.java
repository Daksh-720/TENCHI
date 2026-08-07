package com.daksh.springboard.dto;

public class CreateClipResponse {

    private Long id;
    private String shareCode;
    private String message;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

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

    public CreateClipResponse(Long id, String shareCode, String message){
        this.id = id;
        this.shareCode = shareCode;
        this.message = message;
    }
}
