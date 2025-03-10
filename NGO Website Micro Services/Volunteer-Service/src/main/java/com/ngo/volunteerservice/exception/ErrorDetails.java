package com.ngo.volunteerservice.exception;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ErrorDetails {
    private LocalDateTime timestamp;
    private String message;
    private String details;
    private String errorCode;
    private Map<String, String> validationErrors;

    // Constructor for general exceptions
    public ErrorDetails(LocalDateTime timestamp, String message, String details, String errorCode) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
        this.errorCode = errorCode;
    }

    // Constructor for validation errors
    public ErrorDetails(LocalDateTime timestamp, String message, String details,
                        String errorCode, Map<String, String> validationErrors) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
        this.errorCode = errorCode;
        this.validationErrors = validationErrors;
    }
    
    public ErrorDetails(String errorCode, String message, String details) {
        super();
        this.errorCode = errorCode;
        this.message = message;
        this.details = details;
    }
}