package com.daksh.springboard.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "content"})
public class GetClipResponse {
    
    private Long id;
    private String content;

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
}
