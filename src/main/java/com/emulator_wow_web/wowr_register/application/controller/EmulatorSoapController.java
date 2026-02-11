package com.emulator_wow_web.wowr_register.application.controller;

import com.emulator_wow_web.wowr_register.application.dto.SoapCommandResultDto;
import com.emulator_wow_web.wowr_register.application.service.EmulatorSoapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/server")
@RequiredArgsConstructor
public class EmulatorSoapController {

    private final EmulatorSoapService emulatorSoapService;

    /**
     * Información del servidor obtenida vía SOAP del emulador (solo lectura).
     */
    @GetMapping("/info")
    public ResponseEntity<SoapCommandResultDto> serverInfo() {
        return ResponseEntity.ok(emulatorSoapService.getServerInfo());
    }

    /**
     * Ejecuta un comando de solo lectura permitido (por defecto solo "server info").
     */
    @GetMapping("/soap")
    public ResponseEntity<SoapCommandResultDto> executeReadOnly(
            @RequestParam(defaultValue = "server info") String command) {
        return ResponseEntity.ok(emulatorSoapService.executeReadOnlyCommand(command));
    }
}
