package ru.miov.moneymanagarclientbackend.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import lombok.Value;

/**
 * DTO for {@link ru.miov.moneymanagarclientbackend.store.entity.Account}
 */
@Value
public class AccountDto implements Serializable {

    Long id;

    String name;

    String description;

    BigDecimal initialBalance;

    Instant createdAt;

}