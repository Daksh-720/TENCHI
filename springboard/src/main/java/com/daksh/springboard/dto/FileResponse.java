package com.daksh.springboard.dto;

import com.daksh.springboard.model.ContentType;

public class FileResponse {
    private Long id;
    private String fileName;
    private Long fileSize;
    private ContentType contentType;

    public FileResponse(Long id, String fileName, Long fileSize, ContentType contentType) {
        this.id = id;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.contentType = contentType;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public ContentType getContentType(){
        return contentType;
    }
}
