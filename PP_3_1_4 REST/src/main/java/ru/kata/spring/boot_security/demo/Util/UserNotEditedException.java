package ru.kata.spring.boot_security.demo.Util;

public class UserNotEditedException extends RuntimeException{
    public UserNotEditedException(String message){
        super(message);
    }
}
