package com.ngo.donationservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngo.donationservice.model.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long>{
	List<Donation> findByUserId(Long userId);
}
