package com.emulator_wow_web.wowr_register.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemTemplatePublicDto {
    private Long entry;
    private String name;
    private Long itemLevel;
}
