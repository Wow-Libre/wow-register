package com.emulator_wow_web.wowr_register.infrastructure.client;

import com.emulator_wow_web.wowr_register.infrastructure.client.soap.ExecuteCommand;
import com.emulator_wow_web.wowr_register.infrastructure.client.soap.resp.ExecuteCommandResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.ws.client.core.WebServiceTemplate;

/**
 * Cliente SOAP para el emulador Trinity (un solo reino).
 * Permite ejecutar comandos en el mundo del juego.
 */
@Component
public class EmulatorSoapClient {

    private final WebServiceTemplate emulatorSoapTemplate;

    public EmulatorSoapClient(@Qualifier("emulatorSoapTemplate") WebServiceTemplate emulatorSoapTemplate) {
        this.emulatorSoapTemplate = emulatorSoapTemplate;
    }

    /**
     * Ejecuta un comando en el emulador (ej. .server info).
     *
     * @param command comando de consola del servidor
     * @return respuesta del servidor o null si no hay respuesta
     */
    public String executeCommand(String command) {
        ExecuteCommand request = new ExecuteCommand();
        request.setCommand(command);
        Object response = emulatorSoapTemplate.marshalSendAndReceive(request);
        if (response instanceof ExecuteCommandResponse r) {
            return r.getResult();
        }
        return null;
    }
}
