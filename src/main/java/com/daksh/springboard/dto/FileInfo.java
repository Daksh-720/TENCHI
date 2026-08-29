package com.daksh.springboard.dto;

public class FileInfo {
    private String fileName;
    private String filePath;
    private Long fileSize;

    public FileInfo(String fileName, String filePath, Long fileSize){
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public String getFileName(){
        return fileName;
    }
    public String getFilePath(){
        return filePath;
    }
    public Long getFileSize(){
        return fileSize;
    }
}
