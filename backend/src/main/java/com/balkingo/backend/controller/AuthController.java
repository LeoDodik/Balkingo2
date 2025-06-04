package com.balkingo.backend.controller;

import com.balkingo.backend.model.User;
import com.balkingo.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        boolean exists = userService.userExists(user.getEmail());

        if (exists) {
            response.put("status", "EXISTS");
            response.put("message", "User already exists");
        } else {
            userService.register(user.getEmail(), user.getPassword());
            response.put("status", "NEW");
            response.put("redirect", "/profile-setup");
        }

        return response;
    }

    @PostMapping("/profile-setup")
    public Map<String, String> saveProfile(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.updateProfile(user.getEmail(), user.getNickname(), user.getCountry(), user.getLevel());
            response.put("status", "OK");
        } catch (IllegalArgumentException e) {
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
        }
        return response;
    }
}
