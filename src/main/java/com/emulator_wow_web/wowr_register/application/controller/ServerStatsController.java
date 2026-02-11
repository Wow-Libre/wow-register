package com.emulator_wow_web.wowr_register.application.controller;

import com.emulator_wow_web.wowr_register.application.dto.ServerStatsDto;
import com.emulator_wow_web.wowr_register.application.service.ServerStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/server")
@RequiredArgsConstructor
public class ServerStatsController {

    private final ServerStatsService serverStatsService;

    @GetMapping("/stats")
    public ResponseEntity<ServerStatsDto> stats() {
        return ResponseEntity.ok(serverStatsService.getStats());
    }
}
