package com.daksh.springboard.service;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daksh.springboard.repository.ClipRepository;

@Service
public class ClipCleanupService {
    private final ClipRepository clipRepository;
    public ClipCleanupService(ClipRepository clipRepository){
        this.clipRepository = clipRepository;
    }

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void deleteExpiredClips() {
        clipRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }

}
