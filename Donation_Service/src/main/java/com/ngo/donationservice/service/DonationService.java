package com.ngo.donationservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ngo.donationservice.client.UserClient;
import com.ngo.donationservice.dto.User;
import com.ngo.donationservice.model.Donation;
import com.ngo.donationservice.repository.DonationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DonationService {

	DonationRepository donationRepository;

	UserClient userClient;

	public Donation addDonation(Donation donation) {
		donation.setDonationStatus("Pending");
		
		Donation savedDonation = donationRepository.save(donation);
		
		User user = userClient.getUserById(savedDonation.getUserId());
		savedDonation.setUser(user);
		
		return savedDonation;
	}

	public Optional<Donation> getDonationById(Long id) {
		Optional<Donation> donation = donationRepository.findById(id);
		donation.ifPresent(d -> d.setUser(userClient.getUserById(d.getUserId())));
		return donation;
	}

	public List<Donation> getAllDonations() {
		List<Donation> donations = donationRepository.findAll();
		for (Donation d : donations) {
			d.setUser(userClient.getUserById(d.getUserId()));
		}
		return donations;
	}

	public List<Donation> getDonationsByUser(Long userId) {
		List<Donation> donations = donationRepository.findByUserId(userId);
		User user = userClient.getUserById(userId);

		return donations.stream().map(donation -> {
			donation.setUser(user);
			return donation;
		}).toList();
	}

}
