package com.myntra.backend.controller;

import com.myntra.backend.model.User;
import com.myntra.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
        return userRepository.findByMobile(loginData.getMobile())
                .orElseGet(() -> userRepository.save(loginData)); // Simple: create if not exists
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userData) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userData.getName());
        user.setEmail(userData.getEmail());
        user.setMobile(userData.getMobile());
        user.setAddress(userData.getAddress());
        user.setCartData(userData.getCartData());
        user.setWishlistData(userData.getWishlistData());
        return userRepository.save(user);
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
