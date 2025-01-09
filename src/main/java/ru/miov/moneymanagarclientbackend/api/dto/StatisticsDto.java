package ru.miov.moneymanagarclientbackend.api.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StatisticsDto {

    BigDecimal income;

    BigDecimal expense;

}