package com.balkingo.backend.controller;

import com.balkingo.backend.model.User;
import com.balkingo.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        if (!userService.userExists(user.getEmail())) {
            userService.register(user.getEmail(), user.getPassword());
            return "User registered successfully";
        } else if (userService.authenticate(user.getEmail(), user.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }
}
