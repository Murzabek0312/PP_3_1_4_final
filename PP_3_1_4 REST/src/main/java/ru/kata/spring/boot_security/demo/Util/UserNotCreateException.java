package ru.kata.spring.boot_security.demo.Util;

public class UserNotCreateException extends RuntimeException{

    public UserNotCreateException(String message){
        super(message);
    }
}
