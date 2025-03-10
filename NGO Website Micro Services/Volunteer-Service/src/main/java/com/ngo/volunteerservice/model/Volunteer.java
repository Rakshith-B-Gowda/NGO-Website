package com.ngo.volunteerservice.model;

import com.ngo.volunteerservice.dto.EventDto;
import com.ngo.volunteerservice.dto.UserDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long volunteerId;

    private Long userId;
    private Long eventId;

    @Transient
    private UserDto user;

    @Transient
    private EventDto event;
}
