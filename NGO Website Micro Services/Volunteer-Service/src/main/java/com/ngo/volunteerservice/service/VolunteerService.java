package com.ngo.volunteerservice.service;

import java.util.List;

import com.ngo.volunteerservice.model.Volunteer;

public interface VolunteerService {
	Volunteer registerVolunteer(Long userId, Long eventId);

	Volunteer getVolunteerById(Long id);

	List<Volunteer> getVolunteersByUserId(Long userId);

	void deleteVolunteer(Long id);

	void deleteVolunteersByEventId(Long id);

}
