package com.emulator_wow_web.wowr_register.infrastructure.persistence.auth;

import com.emulator_wow_web.wowr_register.infrastructure.entities.auth.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Base de datos: <b>auth</b>. Usado para estadísticas y para comprobar si un usuario existe al registrar.
 */
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

    Optional<AccountEntity> findByUsername(String username);

    long count();

    long countByOnlineTrue();
}
