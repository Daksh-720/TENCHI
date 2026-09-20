package com.daksh.springboard.util;

import java.security.SecureRandom;
import org.springframework.stereotype.Component;


@Component
public class CodeGenerator {

    private static final String CHARACTERS = "abcxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public String generate(){
        StringBuilder code = new StringBuilder(6);
        for(int i=0; i<6; i++){
            int randomIndex = RANDOM.nextInt(CHARACTERS.length());
            char randomCharacter = CHARACTERS.charAt(randomIndex);
            code.append(randomCharacter);
        }
        return code.toString();
    }
}
