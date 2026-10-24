package com.daksh.springboard.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.daksh.springboard.dto.FileInfo;

import jakarta.annotation.PostConstruct;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class StorageService {

    private static final Logger log = LoggerFactory.getLogger(StorageService.class);

    @Value("${b2.bucket.name:}")
    private String bucketName;

    @Value("${b2.endpoint:}")
    private String endpoint;

    @Value("${b2.region:}")
    private String region;

    @Value("${b2.access.key:}")
    private String accessKey;

    @Value("${b2.secret.key:}")
    private String secretKey;

    private S3Client s3Client;

    @PostConstruct
    public void init() {
        if (accessKey != null && !accessKey.isBlank() && secretKey != null && !secretKey.isBlank()) {
            try {
                this.s3Client = S3Client.builder()
                        .endpointOverride(URI.create(endpoint))
                        .region(Region.of(region))
                        .credentialsProvider(StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(accessKey, secretKey)
                        ))
                        .serviceConfiguration(S3Configuration.builder()
                                .pathStyleAccessEnabled(true)
                                .build())
                        .build();
                log.info("Backblaze B2 S3 Client successfully initialized for bucket: {}", bucketName);
            } catch (Exception e) {
                log.error("Failed to initialize Backblaze B2 S3 Client: {}", e.getMessage(), e);
            }
        } else {
            log.warn("Backblaze B2 credentials not fully provided. Falling back to local disk storage if necessary.");
        }
    }

    public FileInfo upload(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String storedKey = "uploads/" + UUID.randomUUID() + extension;
        long fileSize = file.getSize();

        if (s3Client != null) {
            try {
                PutObjectRequest putRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(storedKey)
                        .contentType(file.getContentType() != null ? file.getContentType() : "application/octet-stream")
                        .contentLength(fileSize)
                        .build();

                s3Client.putObject(putRequest, RequestBody.fromInputStream(file.getInputStream(), fileSize));
                log.info("File uploaded to Backblaze B2: key={}, size={}", storedKey, fileSize);
                return new FileInfo(originalFileName, storedKey, fileSize);
            } catch (Exception e) {
                log.error("Failed to upload to Backblaze B2: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to upload file to Cloud Storage: " + e.getMessage(), e);
            }
        } else {
            // Local fallback (use absolute path and Files.copy to prevent Tomcat relative path FileNotFoundException on Linux)
            try {
                Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                String pureFileName = storedKey.startsWith("uploads/") ? storedKey.substring("uploads/".length()) : storedKey;
                Path destinationPath = uploadDir.resolve(pureFileName);
                Files.copy(file.getInputStream(), destinationPath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                log.info("File stored locally: {}", destinationPath);
                return new FileInfo(originalFileName, destinationPath.toString(), fileSize);
            } catch (IOException e) {
                log.error("Failed to store file locally: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to store file locally: " + e.getMessage(), e);
            }
        }
    }

    public Resource getFile(String storedKey) {
        // 1. Check if it exists locally on disk (backward compatibility)
        if (storedKey != null) {
            Path localPath = Paths.get(storedKey).toAbsolutePath().normalize();
            if (Files.exists(localPath)) {
                return new FileSystemResource(localPath);
            }
        }

        // 2. Fetch from Backblaze B2
        if (s3Client != null && storedKey != null) {
            try {
                GetObjectRequest getRequest = GetObjectRequest.builder()
                        .bucket(bucketName)
                        .key(storedKey)
                        .build();

                software.amazon.awssdk.core.ResponseInputStream<software.amazon.awssdk.services.s3.model.GetObjectResponse> s3Stream = s3Client.getObject(getRequest);
                long contentLength = s3Stream.response().contentLength();
                return new InputStreamResource(s3Stream) {
                    @Override
                    public long contentLength() {
                        return contentLength;
                    }
                };
            } catch (Exception e) {
                log.error("Failed to retrieve file from Backblaze B2 [{}]: {}", storedKey, e.getMessage());
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found in storage: " + e.getMessage());
            }
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found!");
    }

    public void deleteFile(String storedKey) {
        if (storedKey == null || storedKey.isBlank()) {
            return;
        }

        // Try deleting from local disk if it exists
        try {
            Path localPath = Paths.get(storedKey);
            if (Files.exists(localPath)) {
                Files.deleteIfExists(localPath);
            }
        } catch (Exception ignored) {}

        // Delete from Backblaze B2
        if (s3Client != null) {
            try {
                DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(storedKey)
                        .build();
                s3Client.deleteObject(deleteRequest);
                log.info("Deleted file from Backblaze B2: {}", storedKey);
            } catch (Exception e) {
                log.warn("Failed to delete file from Backblaze B2 [{}]: {}", storedKey, e.getMessage());
            }
        }
    }
}
