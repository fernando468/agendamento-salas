package com.app.backend.handler;

public class BadRequestException extends Exception {
    public BadRequestException(String message) {
        super(message);
    }
}
