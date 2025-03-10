package com.ngo.eventservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("VOLUNTEER-SERVICE")
public interface VolunteerInterface {

	@DeleteMapping("/volunteers/event/{id}")
    public void deleteVolunteersByEventId(@PathVariable Long id);
}
