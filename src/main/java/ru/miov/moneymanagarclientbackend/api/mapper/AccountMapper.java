package ru.miov.moneymanagarclientbackend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import ru.miov.moneymanagarclientbackend.api.dto.AccountDto;
import ru.miov.moneymanagarclientbackend.store.entity.Account;

@Mapper
public interface AccountMapper {

    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    AccountDto toDto(Account account);

    Account toEntity(AccountDto accountDto);

}
