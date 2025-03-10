package com.ngo.donationservice.model;

import com.ngo.donationservice.dto.UserDto;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
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

    // User ID may be null for anonymous donations
    private Long userId;

    @NotNull(message = "Donation type is required.")
    @Enumerated(EnumType.STRING)
    private DonationType donationType;

    @NotNull(message = "Amount is required.")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than zero.")
    private Double amount;

    @Enumerated(EnumType.STRING)
    private DonationStatus donationStatus;

    private String frequency;

    private String tributeType;

    private String honoreeName;

    private String message;

    @Embedded
    private DonorInfo donorInfo;

    @Transient
    private UserDto user;
}