package com.ngo.eventservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ngo.eventservice.dto.EventDto;
import com.ngo.eventservice.service.EventService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/events")
public class EventController {
  
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventDto> addEvent(@RequestBody EventDto eventDto) {
        EventDto createdEvent = eventService.addEvent(eventDto);
        return ResponseEntity.status(201).body(createdEvent);
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/{eventId}")
    public ResponseEntity<EventDto> getEvent(@PathVariable Long eventId) {
        EventDto eventDto = eventService.getEventById(eventId);
        return ResponseEntity.ok(eventDto);
    }
    
    @PutMapping("/{eventId}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long eventId, @RequestBody EventDto eventDto) {
        EventDto updatedEvent = eventService.updateEvent(eventId, eventDto);
        return ResponseEntity.ok(updatedEvent);
    }  
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEventById(@PathVariable Long id) {
		eventService.deleteEventById(id);
		return ResponseEntity.ok().build();
	}
}
