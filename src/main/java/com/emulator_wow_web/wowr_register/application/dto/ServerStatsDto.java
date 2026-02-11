package com.emulator_wow_web.wowr_register.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServerStatsDto {
    private long totalAccounts;
    private long totalCharacters;
    private long onlineCharacters;
    private long totalGuilds;
    private long totalItems;
}
