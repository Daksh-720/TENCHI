package com.daksh.springboard.dto;

import java.util.List;

public class PresignFileRequest {
    private List<PresignFileItem> files;
    private Integer expiryMinutes;
    private String shareCode;

    public static class PresignFileItem {
        private String fileName;
        private Long fileSize;
        private String contentType;

        public String getFileName() {
            return fileName;
        }
        public void setFileName(String fileName) {
            this.fileName = fileName;
        }
        public Long getFileSize() {
            return fileSize;
        }
        public void setFileSize(Long fileSize) {
            this.fileSize = fileSize;
        }
        public String getContentType() {
            return contentType;
        }
        public void setContentType(String contentType) {
            this.contentType = contentType;
        }
    }

    public List<PresignFileItem> getFiles() {
        return files;
    }
    public void setFiles(List<PresignFileItem> files) {
        this.files = files;
    }
    public Integer getExpiryMinutes() {
        return expiryMinutes;
    }
    public void setExpiryMinutes(Integer expiryMinutes) {
        this.expiryMinutes = expiryMinutes;
    }
    public String getShareCode() {
        return shareCode;
    }
    public void setShareCode(String shareCode) {
        this.shareCode = shareCode;
    }
}
