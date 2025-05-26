package com.balkingo.backend.service;

import com.balkingo.backend.model.User;
import com.balkingo.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public void register(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // ENCODED password
        userRepository.save(user);
    }

    public boolean authenticate(String email, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            String encodedPassword = optionalUser.get().getPassword();
            return passwordEncoder.matches(rawPassword, encodedPassword); // Password check
        }
        return false;
    }
}
