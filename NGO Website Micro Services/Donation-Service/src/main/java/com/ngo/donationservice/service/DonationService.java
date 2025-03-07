package com.ngo.donationservice.service;

import java.util.List;

import com.ngo.donationservice.model.Donation;

public interface DonationService {

	Donation addDonation(Donation donation);

	Donation getDonationById(Long id);

	List<Donation> getAllDonations();

	List<Donation> getDonationsByUser(Long userId);

}
