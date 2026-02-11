package com.emulator_wow_web.wowr_register.infrastructure.persistence;

import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.GuildEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuildRepository extends JpaRepository<GuildEntity, Long> {

    Page<GuildEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<GuildEntity> findAllByOrderByName(Pageable pageable);

    long count();
}
