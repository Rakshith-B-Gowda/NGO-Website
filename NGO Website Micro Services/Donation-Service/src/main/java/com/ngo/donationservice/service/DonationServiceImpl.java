package com.ngo.donationservice.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ngo.donationservice.client.UserClient;
import com.ngo.donationservice.dto.UserDto;
import com.ngo.donationservice.exception.ResourceNotFoundException;
import com.ngo.donationservice.model.Donation;
import com.ngo.donationservice.model.DonationStatus;
import com.ngo.donationservice.repository.DonationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DonationServiceImpl implements DonationService {

    // Logger for logging messages
    private static final Logger logger = LoggerFactory.getLogger(DonationServiceImpl.class);

    // Repository for accessing Donation data
    private final DonationRepository donationRepository;

    // Feign client for interacting with the User Service
    private final UserClient userClient;

    @Override
    public Donation addDonation(Donation donation) {
        logger.info("Adding a new donation: {}", donation);

        // Set the initial status of the donation
        donation.setDonationStatus(DonationStatus.PENDING);

        // Save the donation to the repository
        Donation savedDonation = donationRepository.save(donation);
        logger.debug("Donation saved with ID: {}", savedDonation.getDonationId());

        try {
            // Fetch user details from the User Service and set it in the donation
            UserDto user = userClient.getUserById(savedDonation.getUserId());
            savedDonation.setUser(user);
        } catch (Exception e) {
            logger.error("Failed to fetch user details: {}", e.getMessage());
            // You might choose to set user to null or handle accordingly
        }

        logger.info("Donation successfully added with ID: {}", savedDonation.getDonationId());
        return savedDonation;
    }

    @Override
    public Donation getDonationById(Long id) {
        logger.info("Fetching donation with ID: {}", id);

        // Find the donation by ID and fetch user details
        Donation donation = donationRepository.findById(id).map(d -> {
            logger.debug("Donation found: {}", d);
            try {
                // Fetch user details and set it in the donation
                d.setUser(userClient.getUserById(d.getUserId()));
            } catch (Exception e) {
                logger.error("Failed to fetch user details for donation ID {}: {}", id, e.getMessage());
            }
            return d;
        }).orElseThrow(() -> {
            logger.error("Donation not found with ID: {}", id);
            return new ResourceNotFoundException("Donation", "id", id);
        });

        logger.info("Successfully retrieved donation with ID: {}", id);
        return donation;
    }

    @Override
    public List<Donation> getAllDonations() {
        logger.info("Fetching all donations");

        // Retrieve all donations from the repository
        List<Donation> donations = donationRepository.findAll();
        logger.debug("Number of donations found: {}", donations.size());

        // For each donation, fetch and set user details
        for (Donation d : donations) {
            try {
                d.setUser(userClient.getUserById(d.getUserId()));
            } catch (Exception e) {
                logger.error("Failed to fetch user details for donation ID {}: {}", d.getDonationId(), e.getMessage());
            }
        }

        logger.info("All donations retrieved successfully");
        return donations;
    }

    @Override
    public List<Donation> getDonationsByUser(Long userId) {
        logger.info("Fetching donations for user ID: {}", userId);

        UserDto user;
        try {
            // Fetch user details from the User Service
            user = userClient.getUserById(userId);
            if (user == null) {
                logger.error("User not found with ID: {}", userId);
                throw new ResourceNotFoundException("User", "id", userId);
            }
            logger.debug("User found: {}", user);
        } catch (Exception e) {
            logger.error("Failed to fetch user details: {}", e.getMessage());
            throw new ResourceNotFoundException("User", "id", userId);
        }

        // Retrieve donations made by the user
        List<Donation> donations = donationRepository.findByUserId(userId);
        logger.debug("Number of donations found for user {}: {}", userId, donations.size());

        // Set the user details in each donation
        for (Donation donation : donations) {
            donation.setUser(user);
        }

        logger.info("Donations for user ID {} retrieved successfully", userId);
        return donations;
    }

}
