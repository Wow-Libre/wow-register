package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.CharacterPublicDto;
import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.CharactersEntity;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.CharactersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CharacterPublicService {

    private final CharactersRepository charactersRepository;

    private static final long COPPER_PER_GOLD = 10000;

    public Page<CharacterPublicDto> findAll(Pageable pageable) {
        return charactersRepository.findAllByOrderByLevelDesc(pageable).map(this::toDto);
    }

    public Page<CharacterPublicDto> searchByName(String name, Pageable pageable) {
        return charactersRepository.findByNameContainingIgnoreCase(name, pageable).map(this::toDto);
    }

    public Optional<CharacterPublicDto> findByGuid(Long guid) {
        return charactersRepository.findByGuid(guid).map(this::toDto);
    }

    public long count() {
        return charactersRepository.count();
    }

    public long countOnline() {
        return charactersRepository.countByOnline(1);
    }

    private CharacterPublicDto toDto(CharactersEntity c) {
        long money = c.getMoney() != null ? c.getMoney().longValue() : 0;
        long gold = money / COPPER_PER_GOLD;
        return CharacterPublicDto.builder()
                .guid(c.getGuid())
                .name(c.getName())
                .race(c.getRace())
                .classId(c.getClassCharacters())
                .gender(c.getGender())
                .level(c.getLevel())
                .xp(c.getXp())
                .gold(gold)
                .online(c.getOnline())
                .totalKills(c.getTotalKills())
                .zone(c.getZone())
                .map(c.getMap())
                .build();
    }
}
