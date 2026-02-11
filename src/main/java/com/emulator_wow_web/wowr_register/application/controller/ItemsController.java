package com.emulator_wow_web.wowr_register.application.controller;

import com.emulator_wow_web.wowr_register.application.dto.ItemTemplatePublicDto;
import com.emulator_wow_web.wowr_register.application.service.ItemTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemsController {

    private final ItemTemplateService itemTemplateService;

    @GetMapping
    public ResponseEntity<Page<ItemTemplatePublicDto>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String name) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "itemLevel"));
        Page<ItemTemplatePublicDto> result = name != null && !name.isBlank()
                ? itemTemplateService.searchByName(name.trim(), pageable)
                : itemTemplateService.findAll(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{entry}")
    public ResponseEntity<ItemTemplatePublicDto> getByEntry(@PathVariable Long entry) {
        return itemTemplateService.findByEntry(entry)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
