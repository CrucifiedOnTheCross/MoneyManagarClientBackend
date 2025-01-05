package ru.miov.moneymanagarclientbackend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import ru.miov.moneymanagarclientbackend.api.dto.TransactionDto;
import ru.miov.moneymanagarclientbackend.store.entity.Transaction;

@Mapper
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    TransactionDto toTransactionDto(Transaction transaction);

    Transaction toTransaction(TransactionDto transactionDto);

}
