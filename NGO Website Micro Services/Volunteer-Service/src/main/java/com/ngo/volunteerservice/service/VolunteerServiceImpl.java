package com.ngo.volunteerservice.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ngo.volunteerservice.dto.EventDto;
import com.ngo.volunteerservice.dto.UserDto;
import com.ngo.volunteerservice.exception.AlreadyExistsException;
import com.ngo.volunteerservice.exception.ResourceNotFoundException;
import com.ngo.volunteerservice.feign.EventServiceClient;
import com.ngo.volunteerservice.feign.UserInterface;
import com.ngo.volunteerservice.model.Volunteer;
import com.ngo.volunteerservice.repository.VolunteerRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VolunteerServiceImpl implements VolunteerService {

    private static final Logger logger = LoggerFactory.getLogger(VolunteerServiceImpl.class);

    private final VolunteerRepository volunteerRepository;
    private final UserInterface userInterface;
    private final EventServiceClient eventServiceClient;

    @Override
    public Volunteer registerVolunteer(Long userId, Long eventId) {
        logger.info("Registering volunteer with user ID {} for event ID {}", userId, eventId);

        // Check if the user exists in User Service
        UserDto user = userInterface.getUserById(userId);
        if (user == null) {
            logger.error("User not found with ID: {}", userId);
            throw new ResourceNotFoundException("User", "ID", userId);
        }

        // Fetch event details from Event Service
        EventDto eventDto = eventServiceClient.getEvent(eventId);
        if (eventDto == null) {
            logger.error("Event not found with ID: {}", eventId);
            throw new ResourceNotFoundException("Event", "ID", eventId);
        }

        // Check if the user is already registered for the event
        Volunteer existingVolunteer = volunteerRepository.findByUserIdAndEventId(userId, eventId);
        if (existingVolunteer != null) {
            logger.warn("Volunteer with user ID {} is already registered for event ID {}", userId, eventId);
            throw new AlreadyExistsException("Volunteer is already registered for this event.");
        }

        // Create new volunteer registration
        Volunteer volunteer = new Volunteer();
        volunteer.setUserId(userId);
        volunteer.setEventId(eventId);
        volunteer.setUser(user);   // Transient field
        volunteer.setEvent(eventDto); // Transient field

        // Save new volunteer registration
        Volunteer savedVolunteer = volunteerRepository.save(volunteer);
        logger.info("Volunteer registered successfully with ID: {}", savedVolunteer.getVolunteerId());

        return savedVolunteer;
    }
    
    @Override
    public Volunteer getVolunteerById(Long id) {
        logger.info("Fetching volunteer with ID: {}", id);

        // Find the volunteer by ID
        Volunteer volunteer = volunteerRepository.findById(id).orElseThrow(() -> {
            logger.error("Volunteer not found with ID: {}", id);
            return new ResourceNotFoundException("Volunteer", "ID", id);
        });

        // Fetch and set user details
        UserDto user = userInterface.getUserById(volunteer.getUserId());
        volunteer.setUser(user);

        // Fetch and set event details
        EventDto event = eventServiceClient.getEvent(volunteer.getEventId());
        volunteer.setEvent(event);

        logger.info("Volunteer retrieved successfully with ID: {}", id);
        return volunteer;
    }

    @Override
    public List<Volunteer> getVolunteersByUserId(Long userId) {
        logger.info("Fetching volunteers for user ID: {}", userId);

        // Check if the user exists
        UserDto user = userInterface.getUserById(userId);
        if (user == null) {
            logger.error("User not found with ID: {}", userId);
            throw new ResourceNotFoundException("User", "ID", userId);
        }
        logger.debug("User found: {}", user);

        // Find volunteers by user ID
        List<Volunteer> volunteers = volunteerRepository.findByUserId(userId);

        if (volunteers.isEmpty()) {
            logger.info("No volunteer registrations found for User ID: {}", userId);
            // return the empty list
            return volunteers;
        }
        logger.debug("Number of volunteers found for user {}: {}", userId, volunteers.size());

        // Set user and event details in each volunteer
        for (Volunteer volunteer : volunteers) {
            volunteer.setUser(user);
            EventDto event = eventServiceClient.getEvent(volunteer.getEventId());
            volunteer.setEvent(event);
        }

        logger.info("Volunteers for user ID {} retrieved successfully", userId);
        return volunteers;
    }
    
    @Override
    public void deleteVolunteer(Long id) {
        logger.info("Deleting volunteer with ID: {}", id);

        // Find the volunteer to delete
        Volunteer volunteer = volunteerRepository.findById(id).orElseThrow(() -> {
            logger.error("Volunteer not found with ID: {}", id);
            return new ResourceNotFoundException("Volunteer", "ID", id);
        });

        // Delete the volunteer from the repository
        volunteerRepository.delete(volunteer);
        logger.info("Volunteer with ID {} deleted successfully", id);
    }

	@Override
	@Transactional // Ensures a transactional context is established for delete operations
	public void deleteVolunteersByEventId(Long id) {
		volunteerRepository.deleteByEventId(id);
	}

}

