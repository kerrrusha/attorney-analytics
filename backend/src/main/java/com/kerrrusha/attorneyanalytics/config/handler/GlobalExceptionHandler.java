package com.kerrrusha.attorneyanalytics.config.handler;

import com.kerrrusha.attorneyanalytics.dto.ErrorResponse;
import com.kerrrusha.attorneyanalytics.exception.UserAlreadyExistsException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler({
            JwtException.class,
            AccessDeniedException.class,
            BadCredentialsException.class,
            UserAlreadyExistsException.class})
    public ErrorResponse handleForbidden(Throwable e) {
        return new ErrorResponse("Access denied: " + e.getMessage());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({HttpMessageNotReadableException.class})
    public ErrorResponse handleMessageNotReadable(Throwable e) {
        return new ErrorResponse("Bad request: " + e.getMessage());
    }
}
