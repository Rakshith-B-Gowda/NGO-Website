package com.ngo.donationservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ngo.donationservice.model.Donation;
import com.ngo.donationservice.service.DonationService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/donations")
public class DonationController {

	// Injecting the DonationService to handle business logic
	private final DonationService donationService;

	@PostMapping
	public ResponseEntity<Donation> createDonation(@Valid @RequestBody Donation donation) {
		Donation createdDonation = donationService.addDonation(donation);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdDonation);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
		Donation donation = donationService.getDonationById(id);
		return ResponseEntity.ok(donation);
	}

	@GetMapping
	public ResponseEntity<List<Donation>> getAllDonations() {
		List<Donation> donations = donationService.getAllDonations();
		return ResponseEntity.ok(donations);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Donation>> getDonationsByUser(@PathVariable Long userId) {
		List<Donation> donations = donationService.getDonationsByUser(userId);
		return ResponseEntity.ok(donations);
	}

}
