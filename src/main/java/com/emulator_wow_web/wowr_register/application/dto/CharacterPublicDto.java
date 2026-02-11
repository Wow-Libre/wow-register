package com.emulator_wow_web.wowr_register.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterPublicDto {
    private Long guid;
    private String name;
    private Integer race;
    private Integer classId;
    private Integer gender;
    private Integer level;
    private Integer xp;
    private Long gold;       // dinero en oro (sin exponer cobre exacto)
    private Integer online;
    private Integer totalKills;
    private Integer zone;
    private Integer map;
}
