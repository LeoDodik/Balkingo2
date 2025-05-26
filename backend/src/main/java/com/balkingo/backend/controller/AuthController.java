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
        boolean exists = userService.userExists(user.getEmail());
        if (exists) {
            return "EXISTS";
        } else {
            userService.register(user.getEmail(), user.getPassword());
            return "NEW";
        }
    }

    @PostMapping("/profile-setup")
    public String saveProfile(@RequestBody User user) {
        userService.updateProfile(user.getEmail(), user.getNickname(), user.getCountry(), user.getLevel());
        return "Profile saved";
    }
}
