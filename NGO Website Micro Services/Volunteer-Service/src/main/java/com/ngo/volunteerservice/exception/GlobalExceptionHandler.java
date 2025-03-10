package com.ngo.volunteerservice.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException exception,
			WebRequest webRequest) {

		// Create ErrorDetails object with exception information
		ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), exception.getMessage(),
				webRequest.getDescription(false), "RESOURCE_NOT_FOUND" // Updated error code to be more general
		);

		// Return a ResponseEntity with NOT_FOUND status
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> handleGlobalException(Exception exception, WebRequest webRequest) {

		// Create ErrorDetails object with exception information
		ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), exception.getMessage(),
				webRequest.getDescription(false), "INTERNAL_SERVER_ERROR");

		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(AlreadyExistsException.class)
	public ResponseEntity<ErrorDetails> handleAlreadyExistsException(
	        AlreadyExistsException ex, WebRequest request) {
	    ErrorDetails errorDetails = new ErrorDetails(
	            "CONFLICT",
	            ex.getMessage(),
	            request.getDescription(false));
	    return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
	}


	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {

		// Map to hold field names and corresponding error messages
		Map<String, String> errors = new HashMap<>();

		// Retrieve all validation errors
		List<ObjectError> errorList = ex.getBindingResult().getAllErrors();

		// Iterate over the errors and populate the map
		for (ObjectError error : errorList) {
			String fieldName = ((FieldError) error).getField();
			String message = error.getDefaultMessage();
			errors.put(fieldName, message);
		}

		// Create ErrorDetails object with validation error information
		ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), "Validation Failed",
				request.getDescription(false), "VALIDATION_ERROR", errors // Include the map of field errors
		);

		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

}
