package ru.miov.moneymanagarclientbackend.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.miov.moneymanagarclientbackend.store.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
}
