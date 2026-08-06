package com.daksh.springboard.util;

import java.security.SecureRandom;

public class CodeGenerator {

    private static final String CHARACTERS = "abcxyz0123456789";

    public String generate(){
        StringBuilder code = new StringBuilder();
        SecureRandom random = new SecureRandom();

        for(int i=0; i<6; i++){
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomCharacter = CHARACTERS.charAt(randomIndex);
            code.append(randomCharacter);
        }
        return code.toString();
    }
}
