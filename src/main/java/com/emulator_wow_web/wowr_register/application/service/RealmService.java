package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.RealmPublicDto;
import com.emulator_wow_web.wowr_register.infrastructure.entities.auth.RealmlistEntity;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.RealmlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RealmService {

    private final RealmlistRepository realmlistRepository;

    public List<RealmPublicDto> findAll() {
        return realmlistRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Optional<RealmPublicDto> findById(Long id) {
        return realmlistRepository.findById(id).map(this::toDto);
    }

    public Optional<RealmPublicDto> findFirstRealm() {
        return realmlistRepository.findAll().stream().findFirst().map(this::toDto);
    }

    private RealmPublicDto toDto(RealmlistEntity e) {
        return RealmPublicDto.builder()
                .id(e.getId())
                .name(e.getName())
                .address(e.getAddress())
                .build();
    }
}
