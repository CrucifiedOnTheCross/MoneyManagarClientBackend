package ru.miov.moneymanagarclientbackend.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import lombok.Value;
import ru.miov.moneymanagarclientbackend.store.entity.Account;

/**
 * DTO for {@link ru.miov.moneymanagarclientbackend.store.entity.Transaction}
 */
@Value
public class TransactionDto implements Serializable {

    Long id;

    Account account;

    String type;

    BigDecimal amount;

    String description;

    Instant transactionDate;

}