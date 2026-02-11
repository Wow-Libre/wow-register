package com.emulator_wow_web.wowr_register.infrastructure.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;

@Configuration
public class SoapClientConfig {

    @Value("${app.soap.emulator.uri:http://127.0.0.1:7878}")
    private String defaultUri;

    @Value("${app.soap.emulator.username:}")
    private String username;

    @Value("${app.soap.emulator.password:}")
    private String password;

    @Bean
    public Jaxb2Marshaller soapRequestMarshaller() {
        Jaxb2Marshaller m = new Jaxb2Marshaller();
        m.setContextPath("com.emulator_wow_web.wowr_register.infrastructure.client.soap");
        return m;
    }

    @Bean
    public Jaxb2Marshaller soapResponseUnmarshaller() {
        Jaxb2Marshaller m = new Jaxb2Marshaller();
        m.setContextPath("com.emulator_wow_web.wowr_register.infrastructure.client.soap.resp");
        return m;
    }

    @Bean
    public SoapMessageSender soapMessageSender() {
        return new SoapMessageSender(username, password);
    }

    @Bean
    public WebServiceTemplate emulatorSoapTemplate(
            Jaxb2Marshaller soapRequestMarshaller,
            Jaxb2Marshaller soapResponseUnmarshaller,
            SoapMessageSender soapMessageSender) {
        WebServiceTemplate t = new WebServiceTemplate();
        t.setMarshaller(soapRequestMarshaller);
        t.setUnmarshaller(soapResponseUnmarshaller);
        t.setMessageSender(soapMessageSender);
        t.setInterceptors(new ClientInterceptor[]{new SoapLoggingInterceptor()});
        t.setDefaultUri(defaultUri);
        return t;
    }
}
