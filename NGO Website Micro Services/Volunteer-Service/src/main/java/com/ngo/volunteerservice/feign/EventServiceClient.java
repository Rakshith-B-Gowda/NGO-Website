package com.ngo.volunteerservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ngo.volunteerservice.dto.EventDto;

@FeignClient("EVENT-SERVICE")
public interface EventServiceClient {

    @GetMapping("/events/{eventId}")
    EventDto getEvent(@PathVariable Long eventId);
}
