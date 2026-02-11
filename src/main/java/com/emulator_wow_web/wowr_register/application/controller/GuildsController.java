package com.emulator_wow_web.wowr_register.application.controller;

import com.emulator_wow_web.wowr_register.application.dto.GuildPublicDto;
import com.emulator_wow_web.wowr_register.application.service.GuildPublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guilds")
@RequiredArgsConstructor
public class GuildsController {

    private final GuildPublicService guildPublicService;

    @GetMapping
    public ResponseEntity<Page<GuildPublicDto>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String name) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        Page<GuildPublicDto> result = name != null && !name.isBlank()
                ? guildPublicService.searchByName(name.trim(), pageable)
                : guildPublicService.findAll(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(guildPublicService.count());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuildPublicDto> getById(@PathVariable Long id) {
        return guildPublicService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
