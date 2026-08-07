package com.daksh.springboard.repository;

import com.daksh.springboard.model.Clip;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClipRepository extends JpaRepository<Clip, Long>{
    Optional<Clip> findByShareCode(String shareCode);
}
