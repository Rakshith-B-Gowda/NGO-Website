package com.ngo.donationservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ngo.donationservice.dto.User;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {
	
	@GetMapping("/api/users/{id}")
	public User getUserById(@PathVariable Long id);
}
