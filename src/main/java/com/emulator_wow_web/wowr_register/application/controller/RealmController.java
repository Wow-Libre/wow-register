package com.emulator_wow_web.wowr_register.application.controller;

import com.emulator_wow_web.wowr_register.application.dto.RealmPublicDto;
import com.emulator_wow_web.wowr_register.application.service.RealmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/realms")
@RequiredArgsConstructor
public class RealmController {

    private final RealmService realmService;

    @GetMapping
    public ResponseEntity<List<RealmPublicDto>> list() {
        return ResponseEntity.ok(realmService.findAll());
    }

    @GetMapping("/first")
    public ResponseEntity<RealmPublicDto> first() {
        return realmService.findFirstRealm()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RealmPublicDto> getById(@PathVariable Long id) {
        return realmService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
