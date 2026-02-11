package com.emulator_wow_web.wowr_register.infrastructure.persistence;

import com.emulator_wow_web.wowr_register.infrastructure.entities.world.ItemTemplateEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemTemplateRepository extends JpaRepository<ItemTemplateEntity, Long> {

    Page<ItemTemplateEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<ItemTemplateEntity> findAllByOrderByItemLevelDesc(Pageable pageable);
}
