package ru.miov.moneymanagarclientbackend.api.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ru.miov.moneymanagarclientbackend.api.dto.AccountDto;
import ru.miov.moneymanagarclientbackend.api.exception.AccountNotFoundException;
import ru.miov.moneymanagarclientbackend.api.exception.AccountOperationException;
import ru.miov.moneymanagarclientbackend.api.mapper.AccountMapper;
import ru.miov.moneymanagarclientbackend.store.entity.Account;
import ru.miov.moneymanagarclientbackend.store.repository.AccountRepository;

@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;

    public AccountDto createAccount(AccountDto accountDto) {
        if (accountDto.getInitialBalance() == null || accountDto.getInitialBalance().signum() < 0) {
            throw new AccountOperationException("Initial balance must be a non-negative value");
        }

        Account account = accountMapper.toEntity(accountDto);
        Account savedAccount = accountRepository.save(account);
        return accountMapper.toDto(savedAccount);
    }

    public AccountDto getAccountById(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with ID: " + id));
        return accountMapper.toDto(account);
    }

    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(accountMapper::toDto)
                .collect(Collectors.toList());
    }

    public AccountDto updateAccount(Long id, AccountDto accountDto) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with ID: " + id));

        account.setName(accountDto.getName());
        account.setDescription(accountDto.getDescription());
        account.setInitialBalance(accountDto.getInitialBalance());

        Account updatedAccount = accountRepository.save(account);
        return accountMapper.toDto(updatedAccount);
    }

    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new AccountNotFoundException("Account not found with ID: " + id);
        }
        accountRepository.deleteById(id);
    }

}
