package com.daksh.springboard.service;

import org.springframework.stereotype.Service;

import com.daksh.springboard.dto.CreateClipRequest;

@Service
public class ClipService {
    public void createClip(CreateClipRequest request){
        System.out.println(request.getContent());
    }
}
