package ru.miov.moneymanagarclientbackend.api.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import ru.miov.moneymanagarclientbackend.api.dto.TransactionDto;
import ru.miov.moneymanagarclientbackend.api.exception.AccountNotFoundException;
import ru.miov.moneymanagarclientbackend.api.exception.TransactionNotFoundException;
import ru.miov.moneymanagarclientbackend.api.mapper.TransactionMapper;
import ru.miov.moneymanagarclientbackend.store.entity.Account;
import ru.miov.moneymanagarclientbackend.store.entity.Transaction;
import ru.miov.moneymanagarclientbackend.store.repository.AccountRepository;
import ru.miov.moneymanagarclientbackend.store.repository.TransactionRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TransactionService {

    TransactionRepository transactionRepository;
    AccountRepository accountRepository;
    TransactionMapper transactionMapper;

    public TransactionDto addTransaction(TransactionDto transactionDto) {
        Account account = accountRepository.findById(transactionDto.getAccountId())
                .orElseThrow(() -> new AccountNotFoundException(
                        "Account not found with id: " + transactionDto.getAccountId()));

        BigDecimal amount = transactionDto.getAmount();
        BigDecimal updatedBalance = "income".equals(transactionDto.getType())
                ? account.getInitialBalance().add(amount)
                : account.getInitialBalance().subtract(amount);

        account.setInitialBalance(updatedBalance);

        Transaction transaction = transactionMapper.toEntity(transactionDto);
        transaction.setAccount(account);

        Transaction savedTransaction = transactionRepository.save(transaction);

        return transactionMapper.toDto(savedTransaction);
    }


    public void deleteTransaction(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction not found with ID: " + id));

        Account account = transaction.getAccount();
        BigDecimal amount = transaction.getAmount();

        BigDecimal updatedBalance = "income".equals(transaction.getType())
                ? account.getInitialBalance().subtract(amount)
                : account.getInitialBalance().add(amount);

        account.setInitialBalance(updatedBalance);
        accountRepository.save(account);

        transactionRepository.delete(transaction);
    }


    public List<TransactionDto> getTransactionsByAccount(Long accountId) {
        accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with ID: " + accountId));

        return transactionRepository.findAllByAccountId(accountId)
                .stream()
                .map(transactionMapper::toDto)
                .collect(Collectors.toList());
    }

}
