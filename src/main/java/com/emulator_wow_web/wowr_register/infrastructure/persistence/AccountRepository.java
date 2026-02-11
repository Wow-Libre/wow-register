package com.emulator_wow_web.wowr_register.infrastructure.persistence;

import com.emulator_wow_web.wowr_register.infrastructure.entities.auth.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Solo para estadísticas agregadas (total cuentas, jugadores online).
 * No exponemos datos de cuentas en la API pública.
 */
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

    long count();

    long countByOnlineTrue();
}
