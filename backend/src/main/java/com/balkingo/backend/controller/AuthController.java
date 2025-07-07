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
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userService.findByEmail(request.email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "ERROR",
                    "message", "Korisnik ne postoji"
            ));
        }

        User user = optionalUser.get();

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
