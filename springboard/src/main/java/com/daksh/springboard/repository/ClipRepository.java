package com.daksh.springboard.repository;

import java.time.LocalDateTime;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.daksh.springboard.model.Clip;
import com.daksh.springboard.entity.User;

public interface ClipRepository extends JpaRepository<Clip, Long>{
    Optional<Clip> findByShareCode(String shareCode);
    void deleteByExpiresAtBefore(LocalDateTime time);
    
    List<Clip> findByExpiresAtAfter(LocalDateTime time);
    List<Clip> findByOwnerAndExpiresAtAfterOrderByCreatedAtDesc(User owner, LocalDateTime time);
}
