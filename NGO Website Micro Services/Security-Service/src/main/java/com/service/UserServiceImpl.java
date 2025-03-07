package com.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.dto.UserDto;
import com.entity.UserInfo;
import com.exception.EmailNotFoundException;
import com.exception.ResourceNotFoundException;
import com.exception.UserAlreadyExistsException;
import com.repository.UserInfoRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	// Logger for logging events
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private UserInfoRepository userRepository;

	@Override
	public UserInfo registerUser(UserInfo user) {
		logger.info("Attempting to register user with email: {}", user.getUserEmail());

		userRepository.findByUserEmail(user.getUserEmail()).ifPresent(existingUser -> {
			logger.error("Registration failed. Email already exists: {}", user.getUserEmail());
			throw new UserAlreadyExistsException("Email Already Exists for User");
		});
		
		user.setRoles("USER");
		UserInfo savedUser = userRepository.save(user);
		logger.info("User registered successfully with ID: {}", savedUser.getUserId());
		return savedUser;
	}

	@Override
	public UserDto getUserByEmail(String email) {
		logger.info("Fetching user by email: {}", email);

		return userRepository.findByUserEmail(email).map(user -> {
			logger.debug("User found: {}", user);
			return new UserDto(user.getUserId(), user.getUserName(), user.getUserEmail());
		}).orElseThrow(() -> {
			logger.error("User not found with email: {}", email);
			return new EmailNotFoundException("User", "email", email);
		});
	}
	
	@Override
	public UserDto getUserByUsername(String username) {
		logger.info("Fetching user by username: {}", username);

		return userRepository.findByUserName(username).map(user -> {
			logger.debug("User found: {}", user);
			return new UserDto(user.getUserId(), user.getUserName(), user.getUserEmail());
		}).orElseThrow(() -> {
			logger.error("User not found with username: {}", username);
			return new EmailNotFoundException("User", "username", username);
		});
	}

	@Override
	public List<UserDto> getAllUsers() {
		logger.info("Retrieving all users");

		List<UserDto> users = userRepository.findAll().stream()
				.map(user -> new UserDto(user.getUserId(), user.getUserName(), user.getUserEmail()))
				.toList();

		logger.info("Total users found: {}", users.size());
		return users;
	}

	@Override
	public UserDto getUserById(Long id) {
		logger.info("Fetching user by ID: {}", id);

		return userRepository.findById(id).map(user -> {
			logger.debug("User found: {}", user);
			return new UserDto(user.getUserId(), user.getUserName(), user.getUserEmail());
		}).orElseThrow(() -> {
			logger.error("User not found with ID: {}", id);
			return new ResourceNotFoundException("User", "id", id);
		});
	}

	@Override
	public UserDto updateUser(UserDto userDto) {
		logger.info("Updating user with ID: {}", userDto.getId());

		UserInfo user = userRepository.findById(userDto.getId()).orElseThrow(() -> {
			logger.error("Update failed. User not found with ID: {}", userDto.getId());
			return new ResourceNotFoundException("User", "id", userDto.getId());
		});

		// Update user details
		user.setUserName(userDto.getName());
		user.setUserEmail(userDto.getEmail());

		UserInfo updatedUser = userRepository.save(user);
		logger.info("User updated successfully with ID: {}", updatedUser.getUserId());

		return new UserDto(updatedUser.getUserId(), updatedUser.getUserName(), updatedUser.getUserEmail());
	}

	@Override
	public void deleteUser(Long id) {
		logger.info("Deleting user with ID: {}", id);

		UserInfo user = userRepository.findById(id).orElseThrow(() -> {
			logger.error("Deletion failed. User not found with ID: {}", id);
			return new ResourceNotFoundException("User", "id", id);
		});

		userRepository.delete(user);
		logger.info("User deleted successfully with ID: {}", id);
	}

}
