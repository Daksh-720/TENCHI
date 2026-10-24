package com.daksh.springboard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daksh.springboard.model.Clip;
import com.daksh.springboard.model.clipFile;
import com.daksh.springboard.repository.ClipRepository;

@Service
public class ClipCleanupService {
    private final ClipRepository clipRepository;
    private final StorageService storageService;

    public ClipCleanupService(ClipRepository clipRepository, StorageService storageService){
        this.clipRepository = clipRepository;
        this.storageService = storageService;
    }

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void deleteExpiredClips() {
        LocalDateTime now = LocalDateTime.now();
        List<Clip> expiredClips = clipRepository.findByExpiresAtBefore(now);
        for (Clip clip : expiredClips) {
            if (clip.getFiles() != null) {
                for (clipFile file : clip.getFiles()) {
                    storageService.deleteFile(file.getFilePath());
                }
            }
        }
        clipRepository.deleteByExpiresAtBefore(now);
    }

}
