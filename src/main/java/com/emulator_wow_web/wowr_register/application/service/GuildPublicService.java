package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.GuildPublicDto;
import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.CharactersEntity;
import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.GuildEntity;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.characters.CharactersRepository;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.characters.GuildMemberRepository;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.characters.GuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GuildPublicService {

    private static final long GOLD_VALUE = 10000;
    private static final long SILVER_VALUE = 100;

    private final GuildRepository guildRepository;
    private final GuildMemberRepository guildMemberRepository;
    private final CharactersRepository charactersRepository;

    public Page<GuildPublicDto> findAll(Pageable pageable) {
        return guildRepository.findAllByOrderByName(pageable).map(this::toDto);
    }

    public Page<GuildPublicDto> searchByName(String name, Pageable pageable) {
        return guildRepository.findByNameContainingIgnoreCase(name, pageable).map(this::toDto);
    }

    public Optional<GuildPublicDto> findById(Long id) {
        return guildRepository.findById(id).map(this::toDto);
    }

    public long count() {
        return guildRepository.count();
    }

    private GuildPublicDto toDto(GuildEntity g) {
        long members = guildMemberRepository.countByGuildId(g.getId());
        String leaderName = charactersRepository.findByGuid(g.getLeaderGuid().longValue())
                .map(CharactersEntity::getName)
                .orElse("?");
        return GuildPublicDto.builder()
                .id(g.getId())
                .name(g.getName())
                .leaderName(leaderName)
                .emblemStyle(g.getEmblemStyle())
                .emblemColor(g.getEmblemColor())
                .borderStyle(g.getBorderStyle())
                .borderColor(g.getBorderColor())
                .info(g.getInfo())
                .motd(g.getMotd())
                .createDate(g.getCreateDate())
                .bankMoneyFormatted(formatMoney(g.getBankMoney() != null ? g.getBankMoney() : 0))
                .memberCount((int) members)
                .build();
    }

    private static String formatMoney(long copper) {
        long gold = copper / GOLD_VALUE;
        long remainder = copper % GOLD_VALUE;
        long silver = remainder / SILVER_VALUE;
        if (gold >= 1_000_000) {
            return (gold / 1_000_000) + "M " + (gold % 1_000_000 / 1_000) + "K " + (gold % 1_000) + "g";
        }
        if (gold >= 1_000) {
            return (gold / 1_000) + "K " + (gold % 1_000) + "g";
        }
        return gold + "g " + silver + "s";
    }
}
