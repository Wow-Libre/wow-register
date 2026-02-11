package com.emulator_wow_web.wowr_register.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuildPublicDto {
    private Long id;
    private String name;
    private String leaderName;
    private Long emblemStyle;
    private Long emblemColor;
    private Long borderStyle;
    private Long borderColor;
    private String info;
    private String motd;
    private Long createDate;
    private String bankMoneyFormatted;
    private int memberCount;
}
