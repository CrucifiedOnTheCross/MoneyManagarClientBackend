package ru.miov.moneymanagarclientbackend.api.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import ru.miov.moneymanagarclientbackend.api.dto.StatisticsDto;
import ru.miov.moneymanagarclientbackend.store.entity.Transaction;
import ru.miov.moneymanagarclientbackend.store.repository.TransactionRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatService {

    TransactionRepository transactionRepository;

    public Map<LocalDate, StatisticsDto> getStatisticsByAccountId(Long accountId) {
        List<Transaction> transactions = transactionRepository.findAllByAccountId(accountId);
        Instant now = Instant.now();

        // Получаем текущую дату и строим список предыдущих 6 месяцев
        LocalDate currentDate = now.atZone(ZoneId.systemDefault()).toLocalDate();
        List<LocalDate> months = new ArrayList<>();
        months.add(currentDate.withDayOfMonth(1)); // Начало текущего месяца
        for (int i = 1; i <= 5; i++) {
            months.add(currentDate.minusMonths(i).withDayOfMonth(1)); // Начало каждого из предыдущих 5 месяцев
        }

        // Инициализация результата
        Map<LocalDate, StatisticsDto> result = months.stream()
                .collect(Collectors.toMap(
                        date -> date,
                        date -> new StatisticsDto(BigDecimal.ZERO, BigDecimal.ZERO)
                ));

        // Обработка транзакций
        for (Transaction transaction : transactions) {
            Instant transactionDate = transaction.getTransactionDate();
            LocalDate transactionMonth = transactionDate.atZone(ZoneId.systemDefault()).toLocalDate().withDayOfMonth(1);

            if (months.contains(transactionMonth)) {
                BigDecimal amount = transaction.getAmount();
                StatisticsDto statisticsDto = result.get(transactionMonth);

                if ("income".equals(transaction.getType())) {
                    statisticsDto.setIncome(statisticsDto.getIncome().add(amount));
                } else if ("expense".equals(transaction.getType())) {
                    statisticsDto.setExpense(statisticsDto.getExpense().add(amount));
                }
            }
        }

        return result;
    }
}
