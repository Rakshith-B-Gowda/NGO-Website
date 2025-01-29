package com.ngo.userservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ngo.userservice.model.User;
import com.ngo.userservice.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	private UserRepository userRepository;
	
	
	public User registerUser(User user) {
		return userRepository.save(user);
	}
	
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByUserEmail(email);
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public Optional<User> getUserById(Long id) {
		return userRepository.findById(id);
	}

}
