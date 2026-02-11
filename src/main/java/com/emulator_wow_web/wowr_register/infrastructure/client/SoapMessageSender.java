package com.emulator_wow_web.wowr_register.infrastructure.client;

import org.springframework.http.HttpHeaders;
import org.springframework.ws.transport.http.HttpUrlConnectionMessageSender;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.Base64;

/**
 * Envía las peticiones SOAP al emulador con autenticación Basic opcional.
 */
public class SoapMessageSender extends HttpUrlConnectionMessageSender {

    private final String username;
    private final String password;

    public SoapMessageSender(String username, String password) {
        this.username = username != null ? username : "";
        this.password = password != null ? password : "";
    }

    @Override
    protected void prepareConnection(HttpURLConnection connection) throws IOException {
        if (!username.isEmpty() && !password.isEmpty()) {
            String credentials = username + ":" + password;
            String encoded = Base64.getEncoder().encodeToString(credentials.getBytes());
            connection.setRequestProperty(HttpHeaders.AUTHORIZATION, "Basic " + encoded);
        }
        super.prepareConnection(connection);
    }
}
