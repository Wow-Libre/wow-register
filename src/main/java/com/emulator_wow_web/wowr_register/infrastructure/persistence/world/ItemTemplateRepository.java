package com.emulator_wow_web.wowr_register.infrastructure.persistence.world;

import com.emulator_wow_web.wowr_register.infrastructure.entities.world.ItemTemplateEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Base de datos: <b>world</b>.
 */
public interface ItemTemplateRepository extends JpaRepository<ItemTemplateEntity, Long> {

    Page<ItemTemplateEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<ItemTemplateEntity> findAllByOrderByItemLevelDesc(Pageable pageable);
}
