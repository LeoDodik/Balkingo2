// File: src/main/java/com/balkingo/backend/service/UserService.java
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

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean isProfileComplete(User user) {
        return user.getNickname() != null && user.getCountry() != null && user.getLevel() != null;
    }

    public User register(String email, String rawPassword) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        return userRepository.save(user);
    }

    public User updateProfile(String email, String nickname, String country, String level) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setNickname(nickname);
            user.setCountry(country);
            user.setLevel(level);
            return userRepository.save(user);
        }
        return null;
    }
}
