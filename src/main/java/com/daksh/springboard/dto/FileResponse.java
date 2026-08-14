package com.daksh.springboard.dto;

public class FileResponse {
    private Long id;
    private String fileName;
    private Long fileSize;

    public FileResponse(Long id, String fileName, Long fileSize) {
        this.id = id;
        this.fileName = fileName;
        this.fileSize = fileSize;
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
}
