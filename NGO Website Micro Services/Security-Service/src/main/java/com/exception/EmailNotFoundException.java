package com.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class EmailNotFoundException extends RuntimeException {

	
	private static final long serialVersionUID = -3900731218266521214L;
	private final String resourceName;
    private final String fieldName;
    private final String fieldValue;

    public EmailNotFoundException(String resourceName, String fieldName, String fieldValue) {
    	super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
    	this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
	}

	public String getResourceName() {
		return resourceName;
	}

	public String getFieldName() {
		return fieldName;
	}

	public String getFieldValue() {
		return fieldValue;
	}
}
