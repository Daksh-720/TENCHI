package com.daksh.springboard.dto;

import java.util.List;

public class PresignFileResponse {
    private String shareCode;
    private List<PresignedFileItem> files;

    public PresignFileResponse() {}

    public PresignFileResponse(String shareCode, List<PresignedFileItem> files) {
        this.shareCode = shareCode;
        this.files = files;
    }

    public static class PresignedFileItem {
        private String fileName;
        private String uploadUrl;
        private String storedKey;

        public PresignedFileItem() {}

        public PresignedFileItem(String fileName, String uploadUrl, String storedKey) {
            this.fileName = fileName;
            this.uploadUrl = uploadUrl;
            this.storedKey = storedKey;
        }

        public String getFileName() {
            return fileName;
        }
        public void setFileName(String fileName) {
            this.fileName = fileName;
        }
        public String getUploadUrl() {
            return uploadUrl;
        }
        public void setUploadUrl(String uploadUrl) {
            this.uploadUrl = uploadUrl;
        }
        public String getStoredKey() {
            return storedKey;
        }
        public void setStoredKey(String storedKey) {
            this.storedKey = storedKey;
        }
    }

    public String getShareCode() {
        return shareCode;
    }
    public void setShareCode(String shareCode) {
        this.shareCode = shareCode;
    }
    public List<PresignedFileItem> getFiles() {
        return files;
    }
    public void setFiles(List<PresignedFileItem> files) {
        this.files = files;
    }
}
