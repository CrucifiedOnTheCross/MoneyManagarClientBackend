package ru.miov.moneymanagarclientbackend.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ru.miov.moneymanagarclientbackend.api.dto.StatisticsDto;
import ru.miov.moneymanagarclientbackend.api.service.StatService;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:5173")
public class StatController {

    StatService statService;

    @GetMapping("/{accountId}")
    public ResponseEntity<Map<LocalDate, StatisticsDto>> getStatistics(@PathVariable Long accountId) {
        Map<LocalDate, StatisticsDto> statistics = statService.getStatisticsByAccountId(accountId);
        return ResponseEntity.ok(statistics);
    }

}
