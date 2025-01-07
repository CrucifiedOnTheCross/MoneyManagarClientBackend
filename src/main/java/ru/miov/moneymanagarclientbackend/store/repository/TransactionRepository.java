package ru.miov.moneymanagarclientbackend.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import ru.miov.moneymanagarclientbackend.store.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByAccountId(Long accountId);

    boolean existsById(Long id);

    void deleteById(Long id);

}
