package com.ngo.eventservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EventDto {
    private Long id;
    private String name;
    private String location;
    private String date;
    private String description;
}
