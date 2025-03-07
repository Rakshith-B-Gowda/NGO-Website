package com.ngo.eventservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngo.eventservice.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
