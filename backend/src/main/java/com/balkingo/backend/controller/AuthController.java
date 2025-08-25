package com.balkingo.backend.controller;

import com.balkingo.backend.model.User;
import com.balkingo.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "https://balkingo-static-page.onrender.com"})
public class AuthController {

    @Autowired
    private UserService userService;

    public static class LoginRequest {
        public String email;
        public String password;
    }

    public static class ProfileRequest {
        private String email;
        private String nickname;
        private String country;
        private String level;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getNickname() { return nickname; }
        public void setNickname(String nickname) { this.nickname = nickname; }

        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }

        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userService.findByEmail(request.email);

        User user;

        if (optionalUser.isEmpty()) {
            // 🟡 New user → auto-register
            user = userService.register(request.email, request.password);
            return ResponseEntity.ok(Map.of(
                    "status", "NEW",
                    "redirect", "/profile-setup"
            ));
        } else {
            user = optionalUser.get();

            if (!userService.isPasswordCorrect(user, request.password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "status", "ERROR",
                        "message", "Pogrešna lozinka"
                ));
            }

            boolean isComplete = userService.isProfileComplete(user);
            String redirectPath = isComplete ? "/dashboard" : "/profile-setup";

            return ResponseEntity.ok(Map.of(
                    "status", isComplete ? "EXISTS" : "NEW",
                    "redirect", redirectPath
            ));
        }
    }

    @PostMapping("/profile-setup")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileRequest profileRequest) {
        try {
            userService.updateProfile(
                    profileRequest.getEmail(),
                    profileRequest.getNickname(),
                    profileRequest.getCountry(),
                    profileRequest.getLevel()
            );
            return ResponseEntity.ok(Map.of("status", "OK"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "ERROR",
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/user-by-email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Return selected user info only (safe for frontend)
            return ResponseEntity.ok(Map.of(
                    "email", user.getEmail(),
                    "nickname", user.getNickname(),
                    "country", user.getCountry(),
                    "level", user.getLevel()
            ));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "status", "ERROR",
                "message", "User not found"
        ));
    }

    @PutMapping("/edit-profile")
    public ResponseEntity<?> editProfile(@RequestBody AuthController.ProfileRequest profileRequest) {
        try {
            userService.updateProfile(
                    profileRequest.getEmail(),
                    profileRequest.getNickname(),
                    profileRequest.getCountry(),
                    profileRequest.getLevel()
            );
            return ResponseEntity.ok(Map.of("status", "OK"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "ERROR",
                    "message", e.getMessage()
            ));
        }
    }

}
