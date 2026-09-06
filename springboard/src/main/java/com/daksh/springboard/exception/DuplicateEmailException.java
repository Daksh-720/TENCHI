package com.daksh.springboard.exception;



public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String message){
        super(message);
    }
}
