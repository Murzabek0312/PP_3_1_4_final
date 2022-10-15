package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.Util.UserValidator;

import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UsersRepository;
import ru.kata.spring.boot_security.demo.service.ServiceUser;

@Controller

public class UsersController {

    private final ServiceUser serviceUser;

    private final UsersRepository usersRepository;

    private final UserValidator userValidator;
    private final RoleRepository roleRepository;


    @Autowired
    public UsersController(ServiceUser serviceUser, UsersRepository usersRepository,
                           UserValidator userValidator, RoleRepository roleRepository) {
        this.serviceUser = serviceUser;
        this.usersRepository = usersRepository;
        this.userValidator = userValidator;
        this.roleRepository = roleRepository;
    }


    @GetMapping("/api")
    public String redirectToApi(){
        return "users/index2";
    }

    @GetMapping("/user")
    public String redirectToUserApi(){
        return "users/userht";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "users/login";
    }

}
