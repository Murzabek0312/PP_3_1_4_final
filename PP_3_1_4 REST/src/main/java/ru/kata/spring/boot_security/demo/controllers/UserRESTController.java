package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.Util.UserErrorResponse;
import ru.kata.spring.boot_security.demo.Util.UserNotCreateException;
import ru.kata.spring.boot_security.demo.Util.UserNotEditedException;
import ru.kata.spring.boot_security.demo.Util.UserNotFoundException;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UsersRepository;
import ru.kata.spring.boot_security.demo.service.ServiceUser;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class UserRESTController {
    private final ServiceUser serviceUser;


    private final RoleRepository roleRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public UserRESTController(ServiceUser serviceUser, RoleRepository roleRepository,
                              UsersRepository usersRepository) {
        this.serviceUser = serviceUser;
        this.roleRepository = roleRepository;
        this.usersRepository = usersRepository;
    }


    @GetMapping
    public List<User> getAllUser() {
        return serviceUser.getAll();
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleRepository.findAll(),HttpStatus.OK);
    }

    @GetMapping(value = "/header")
    public ResponseEntity<User> getAuth(Principal principal){
        User user = usersRepository.findByUsername(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public User getOne(@PathVariable("id") int id) {
        return serviceUser.getUserbyId(id);
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append("-").append(error.getDefaultMessage())
                        .append(";");
            }
            throw new UserNotCreateException(errorMsg.toString());
        }
        serviceUser.add(user);
        return ResponseEntity.ok(HttpStatus.OK);

    }

    @PutMapping
    public ResponseEntity<HttpStatus> edit(@RequestBody @Valid User user,
                                           BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append("-").append(error.getDefaultMessage())
                        .append(";");
            }
            throw new UserNotEditedException(errorMsg.toString());
        }

        serviceUser.add(user);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        serviceUser.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handlerException(UserNotFoundException e) {
        UserErrorResponse response = new UserErrorResponse("Пользователь с таким id не найден");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handlerException(UserNotCreateException e) {
        UserErrorResponse response = new UserErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handlerException(UserNotEditedException e) {
        UserErrorResponse response = new UserErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
