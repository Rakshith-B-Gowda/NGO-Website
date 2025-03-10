package com.ngo.volunteerservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngo.volunteerservice.model.Volunteer;


@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long>{
	// Find all volunteer registrations for a given user
    List<Volunteer> findByUserId(Long userId);

    // Find volunteer registration by userId and eventId
    Volunteer findByUserIdAndEventId(Long userId, Long eventId);
    
    // Delete all the volunteers by eventId
    void deleteByEventId(Long eventId);
    
}
