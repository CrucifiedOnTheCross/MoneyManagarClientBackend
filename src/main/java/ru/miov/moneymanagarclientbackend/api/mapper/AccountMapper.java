package ru.miov.moneymanagarclientbackend.api.mapper;

import org.mapstruct.Mapper;

import ru.miov.moneymanagarclientbackend.api.dto.AccountDto;
import ru.miov.moneymanagarclientbackend.store.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDto toDto(Account account);

    Account toEntity(AccountDto accountDto);

}
