package ru.miov.moneymanagarclientbackend.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AccountOperationException extends RuntimeException {

    public AccountOperationException(String message) {
        super(message);
    }

}
