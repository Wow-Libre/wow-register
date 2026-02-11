package com.emulator_wow_web.wowr_register.application.controller;

import com.emulator_wow_web.wowr_register.application.dto.CharacterPublicDto;
import com.emulator_wow_web.wowr_register.application.service.CharacterPublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/characters")
@RequiredArgsConstructor
public class CharactersController {

    private final CharacterPublicService characterPublicService;

    @GetMapping
    public ResponseEntity<Page<CharacterPublicDto>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String name) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "level"));
        Page<CharacterPublicDto> result = name != null && !name.isBlank()
                ? characterPublicService.searchByName(name.trim(), pageable)
                : characterPublicService.findAll(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(characterPublicService.count());
    }

    @GetMapping("/online")
    public ResponseEntity<Long> onlineCount() {
        return ResponseEntity.ok(characterPublicService.countOnline());
    }

    @GetMapping("/{guid}")
    public ResponseEntity<CharacterPublicDto> getByGuid(@PathVariable Long guid) {
        return characterPublicService.findByGuid(guid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
