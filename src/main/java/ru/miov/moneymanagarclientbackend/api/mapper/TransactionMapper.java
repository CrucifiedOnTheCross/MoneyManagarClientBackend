package ru.miov.moneymanagarclientbackend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import ru.miov.moneymanagarclientbackend.api.dto.TransactionDto;
import ru.miov.moneymanagarclientbackend.store.entity.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(target = "accountId", source = "account.id")
    TransactionDto toDto(Transaction transaction);

    @Mapping(target = "account.id", source = "accountId")
    Transaction toEntity(TransactionDto transactionDto);

}
