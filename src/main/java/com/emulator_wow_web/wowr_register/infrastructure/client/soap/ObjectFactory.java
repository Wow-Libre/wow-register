package com.emulator_wow_web.wowr_register.infrastructure.client.soap;

import jakarta.xml.bind.annotation.*;

@XmlRegistry
public class ObjectFactory {

    public ObjectFactory() {
    }

    public Envelope createEnvelope2() {
        return new Envelope();
    }

    public Body createBody2() {
        return new Body();
    }

    public ExecuteCommand createExecuteCommand2() {
        return new ExecuteCommand();
    }

}
