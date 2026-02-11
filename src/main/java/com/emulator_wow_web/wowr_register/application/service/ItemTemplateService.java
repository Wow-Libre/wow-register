package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.ItemTemplatePublicDto;
import com.emulator_wow_web.wowr_register.infrastructure.entities.world.ItemTemplateEntity;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.ItemTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemTemplateService {

    private final ItemTemplateRepository itemTemplateRepository;

    public Page<ItemTemplatePublicDto> findAll(Pageable pageable) {
        return itemTemplateRepository.findAllByOrderByItemLevelDesc(pageable).map(this::toDto);
    }

    public Page<ItemTemplatePublicDto> searchByName(String name, Pageable pageable) {
        return itemTemplateRepository.findByNameContainingIgnoreCase(name, pageable).map(this::toDto);
    }

    public Optional<ItemTemplatePublicDto> findByEntry(Long entry) {
        return itemTemplateRepository.findById(entry).map(this::toDto);
    }

    private ItemTemplatePublicDto toDto(ItemTemplateEntity e) {
        return ItemTemplatePublicDto.builder()
                .entry(e.getEntry())
                .name(e.getName())
                .itemLevel(e.getItemLevel())
                .build();
    }
}
