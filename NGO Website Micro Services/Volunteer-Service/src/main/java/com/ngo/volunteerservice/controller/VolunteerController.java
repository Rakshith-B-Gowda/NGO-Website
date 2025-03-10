package com.ngo.volunteerservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ngo.volunteerservice.model.Volunteer;
import com.ngo.volunteerservice.service.VolunteerService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;

    @PostMapping("/register/{userId}/{eventId}")
    public ResponseEntity<Volunteer> registerVolunteer(@PathVariable Long userId, @PathVariable Long eventId) {
        Volunteer registeredVolunteer = volunteerService.registerVolunteer(userId, eventId);
        return ResponseEntity.ok(registeredVolunteer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable Long id) {
        Volunteer volunteer = volunteerService.getVolunteerById(id);
        return ResponseEntity.ok(volunteer);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Volunteer>> getVolunteersByUserId(@PathVariable Long userId) {
        List<Volunteer> volunteers = volunteerService.getVolunteersByUserId(userId);
        return ResponseEntity.ok(volunteers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVolunteer(@PathVariable Long id) {
        volunteerService.deleteVolunteer(id);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/event/{id}")
    public ResponseEntity<?> deleteVolunteersByEventId(@PathVariable Long id) {
		volunteerService.deleteVolunteersByEventId(id);
		return ResponseEntity.ok().build();
	}
}

