package com.balkingo.backend.service;

import com.balkingo.backend.model.User;
import com.balkingo.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public void register(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        userRepository.save(user);
    }
}
