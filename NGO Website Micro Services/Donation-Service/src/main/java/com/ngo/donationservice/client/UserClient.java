package com.ngo.donationservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ngo.donationservice.dto.UserDto;

@FeignClient("SECURITY-SERVICE")
public interface UserClient {
	
	@GetMapping("/users/id/{id}")
	public UserDto getUserById(@PathVariable Long id);
}
