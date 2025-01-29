package com.ngo.donationservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ngo.donationservice.model.Donation;
import com.ngo.donationservice.service.DonationService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/donations")
public class DonationController {

	DonationService donationService;
	
	@PostMapping
	public Donation createDonation(@Valid @RequestBody Donation donation) {
		return donationService.addDonation(donation);
	}
	
	@GetMapping("/{id}")
	public Optional<Donation> getDonationById(@PathVariable Long id) {
		return donationService.getDonationById(id);
	}
	
	@GetMapping
	public List<Donation> getAllDonations() {
		return donationService.getAllDonations();
	}
	
	@GetMapping("/user/{userId}")
	public List<Donation> getDonationsByUser(@PathVariable Long userId) {
		return donationService.getDonationsByUser(userId);
	}
	
}
