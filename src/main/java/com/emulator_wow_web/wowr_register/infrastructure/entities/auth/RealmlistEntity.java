package com.emulator_wow_web.wowr_register.infrastructure.entities.auth;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "realmlist")
public class RealmlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String name;
    private String address;
}
