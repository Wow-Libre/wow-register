package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.SoapCommandResultDto;
import com.emulator_wow_web.wowr_register.infrastructure.client.EmulatorSoapClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Expone solo comandos de lectura seguros al emulador vía SOAP (ej. server info).
 */
@Service
@RequiredArgsConstructor
public class EmulatorSoapService {

    private static final String ALLOWED_READ_ONLY_COMMAND = "server info";

    private final EmulatorSoapClient emulatorSoapClient;

    /**
     * Ejecuta un comando de solo lectura en el emulador (por ahora solo "server info").
     */
    public SoapCommandResultDto executeReadOnlyCommand(String command) {
        if (command == null || !ALLOWED_READ_ONLY_COMMAND.equalsIgnoreCase(command.trim())) {
            return SoapCommandResultDto.builder()
                    .command(command)
                    .result("Comando no permitido. Solo se permite: " + ALLOWED_READ_ONLY_COMMAND)
                    .success(false)
                    .build();
        }
        try {
            String result = emulatorSoapClient.executeCommand(command);
            return SoapCommandResultDto.builder()
                    .command(command)
                    .result(result != null ? result : "(sin respuesta)")
                    .success(true)
                    .build();
        } catch (Exception e) {
            return SoapCommandResultDto.builder()
                    .command(command)
                    .result("Error conectando al emulador: " + e.getMessage())
                    .success(false)
                    .build();
        }
    }

    public SoapCommandResultDto getServerInfo() {
        return executeReadOnlyCommand(ALLOWED_READ_ONLY_COMMAND);
    }
}
