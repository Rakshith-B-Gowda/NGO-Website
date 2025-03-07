package com.service;

import java.util.List;

import com.dto.UserDto;
import com.entity.UserInfo;


public interface UserService {
    UserInfo registerUser(UserInfo user);

    UserDto getUserByEmail(String email);

    List<UserDto> getAllUsers();

    UserDto getUserById(Long id);

    UserDto updateUser(UserDto userDto);

    void deleteUser(Long id);

	UserDto getUserByUsername(String username);
}
