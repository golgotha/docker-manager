package com.comncon.dockermanager.contracts;

import java.io.Serializable;

public class RemoveImageRequestDto implements Serializable {
    private String id;
    private Boolean force;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean isForce() {
        return force;
    }

    public void setForce(Boolean force) {
        this.force = force;
    }
}
