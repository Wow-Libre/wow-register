package com.emulator_wow_web.wowr_register.infrastructure.persistence;

import com.emulator_wow_web.wowr_register.infrastructure.entities.auth.RealmlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RealmlistRepository extends JpaRepository<RealmlistEntity, Long> {

    Optional<RealmlistEntity> findFirstByNameIgnoreCase(String name);
}
