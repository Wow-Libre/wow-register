package com.emulator_wow_web.wowr_register.infrastructure.entities.world;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "item_template")
public class ItemTemplateEntity {
    @Id
    private Long entry;
    private String name;
    @Column(name = "itemlevel")
    private Long ItemLevel;
}
