package com.daksh.springboard.service;

import java.time.LocalDateTime;
import com.daksh.springboard.repository.ClipRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ClipCleanupService {
    private final ClipRepository clipRepository;
    public ClipCleanupService(ClipRepository clipRepository){
        this.clipRepository = clipRepository;
    }

    @Scheduled(fixedRate = 60000)
        public void deleteExpiredClips() {
            clipRepository.deleteByExpiresAtBefore(LocalDateTime.now());
        }

}
