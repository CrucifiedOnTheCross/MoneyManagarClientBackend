package ru.miov.moneymanagarclientbackend.api.service;

import org.springframework.stereotype.Service;

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
        accountRepository.findById(transactionDto.getAccountId()).orElseThrow(
                () -> new AccountNotFoundException("Account not found with id: " + transactionDto.getAccountId())
        );

        Transaction transaction = transactionMapper.toEntity(transactionDto);
        Transaction savedTransaction = transactionRepository.save(transaction);

        return transactionMapper.toDto(savedTransaction);
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new TransactionNotFoundException("Transaction not found with ID: " + id);
        }
        transactionRepository.deleteById(id);
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
