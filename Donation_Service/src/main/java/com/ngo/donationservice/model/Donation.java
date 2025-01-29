package com.ngo.donationservice.model;

import com.ngo.donationservice.dto.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Donation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long donationId;
	
	private Long userId;  // Link to the User Service
	private String donationType; // Money, Food, Clothes
	private Double amount;
	private String donationStatus; // Pending, Approved, Delivered
	
	@Transient
	private User user; // This field will hold user details from User Service
	
}
