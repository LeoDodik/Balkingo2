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

    public boolean nicknameExists(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();
    }

    public User updateProfile(String email, String nickname, String country, String level) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // ✅ Check if nickname is taken by another user
            Optional<User> existing = userRepository.findByNickname(nickname);
            if (existing.isPresent() && !existing.get().getEmail().equals(email)) {
                throw new IllegalArgumentException("Nickname already taken");
            }

            user.setNickname(nickname);
            user.setCountry(country);
            user.setLevel(level);
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("User not found");
    }
    public boolean isPasswordCorrect(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
