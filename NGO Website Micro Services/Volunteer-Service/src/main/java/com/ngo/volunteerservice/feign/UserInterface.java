package com.ngo.volunteerservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ngo.volunteerservice.dto.UserDto;

@FeignClient("SECURITY-SERVICE")
public interface UserInterface {
	
	@GetMapping("/users/id/{id}")
	public UserDto getUserById(@PathVariable Long id);
}
