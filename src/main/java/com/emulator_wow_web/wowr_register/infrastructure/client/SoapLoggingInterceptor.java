package com.emulator_wow_web.wowr_register.infrastructure.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;
import org.springframework.ws.context.MessageContext;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class SoapLoggingInterceptor implements ClientInterceptor {

    private static final Logger LOG = LoggerFactory.getLogger(SoapLoggingInterceptor.class);

    @Override
    public boolean handleRequest(MessageContext messageContext) {
        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            messageContext.getRequest().writeTo(os);
            LOG.debug("SOAP Request: {}", os.toString(StandardCharsets.UTF_8));
        } catch (IOException e) {
            LOG.warn("Error logging SOAP request: {}", e.getMessage());
        }
        return true;
    }

    @Override
    public boolean handleResponse(MessageContext messageContext) {
        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            messageContext.getResponse().writeTo(os);
            LOG.debug("SOAP Response: {}", os.toString(StandardCharsets.UTF_8));
        } catch (Exception e) {
            LOG.warn("Error logging SOAP response: {}", e.getMessage());
        }
        return true;
    }

    @Override
    public boolean handleFault(MessageContext messageContext) {
        return true;
    }

    @Override
    public void afterCompletion(MessageContext messageContext, Exception ex) {
    }
}
