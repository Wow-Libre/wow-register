package com.emulator_wow_web.wowr_register.infrastructure.entities.characters;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "character_queststatus")
public class CharacterQuestStatusEntity {
    @Id
    @Column(name = "guid")
    private Long id;
    private Long quest;
    private Long status;
}
