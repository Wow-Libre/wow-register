package com.emulator_wow_web.wowr_register.infrastructure.client.soap.resp;

import jakarta.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {"result"})
@XmlRootElement(name = "executeCommandResponse", namespace = "urn:TC")
public class ExecuteCommandResponse {

    @XmlElement(required = true)
    protected String result;

    public String getResult() {
        return result;
    }

    public void setResult(String value) {
        this.result = value;
    }
}
