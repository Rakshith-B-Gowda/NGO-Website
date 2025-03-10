package com.ngo.eventservice.service;

import java.util.List;

import com.ngo.eventservice.dto.EventDto;

public interface EventService {
	EventDto addEvent(EventDto eventDto);

	List<EventDto> getAllEvents();
	
	EventDto getEventById(Long eventId);

	EventDto updateEvent(Long eventId, EventDto eventDto);

	void deleteEventById(Long id);

}
