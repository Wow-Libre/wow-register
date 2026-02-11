package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.ServerStatsDto;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.AccountRepository;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.CharactersRepository;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.GuildRepository;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.ItemTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerStatsService {

    private final AccountRepository accountRepository;
    private final CharactersRepository charactersRepository;
    private final GuildRepository guildRepository;
    private final ItemTemplateRepository itemTemplateRepository;

    public ServerStatsDto getStats() {
        return ServerStatsDto.builder()
                .totalAccounts(accountRepository.count())
                .totalCharacters(charactersRepository.count())
                .onlineCharacters(charactersRepository.countByOnline(1))
                .totalGuilds(guildRepository.count())
                .totalItems(itemTemplateRepository.count())
                .build();
    }
}
