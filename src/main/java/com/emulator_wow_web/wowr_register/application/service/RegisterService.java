package com.emulator_wow_web.wowr_register.application.service;

import com.emulator_wow_web.wowr_register.application.dto.RegisterRequestDto;
import com.emulator_wow_web.wowr_register.application.dto.RegisterResponseDto;
import com.emulator_wow_web.wowr_register.infrastructure.client.EmulatorSoapClient;
import com.emulator_wow_web.wowr_register.infrastructure.persistence.auth.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Registro de cuentas de juego vía SOAP (comando Trinity: account create user pass).
 * Comprueba que el usuario no exista en auth antes de llamar al emulador.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RegisterService {

    private static final String CREATE_ACCOUNT_COMMAND = "account create %s %s";

    private final AccountRepository accountRepository;
    private final EmulatorSoapClient emulatorSoapClient;

    public RegisterResponseDto register(RegisterRequestDto request) {
        String username = request.getUsername().trim();
        String password = request.getPassword();

        if (accountRepository.findByUsername(username).isPresent()) {
            return RegisterResponseDto.builder()
                    .success(false)
                    .message("Ese nombre de usuario ya está registrado.")
                    .username(username)
                    .build();
        }

        String command = String.format(CREATE_ACCOUNT_COMMAND, username, password);
        try {
            String result = emulatorSoapClient.executeCommand(command);
            log.info("Registro SOAP para usuario {}: {}", username, result != null ? "OK" : "sin respuesta");
            return RegisterResponseDto.builder()
                    .success(true)
                    .message("Cuenta creada correctamente. Ya puedes iniciar sesión en el juego.")
                    .username(username)
                    .build();
        } catch (Exception e) {
            log.warn("Error SOAP al registrar {}: {}", username, e.getMessage());
            return RegisterResponseDto.builder()
                    .success(false)
                    .message("No se pudo conectar con el servidor del juego. Intenta más tarde.")
                    .username(username)
                    .build();
        }
    }
}
