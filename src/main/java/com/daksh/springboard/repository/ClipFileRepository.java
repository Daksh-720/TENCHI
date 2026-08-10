package com.daksh.springboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.daksh.springboard.model.clipFile;

public interface ClipFileRepository extends JpaRepository<clipFile, Long> {

    
}