package com.emulator_wow_web.wowr_register.infrastructure.persistence.characters;

import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.CharactersEntity;
import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.dto.CharacterId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Base de datos: <b>characters</b>.
 */
public interface CharactersRepository extends JpaRepository<CharactersEntity, CharacterId> {

    List<CharactersEntity> findByAccountOrderByLevelDesc(Long accountId);

    Optional<CharactersEntity> findByGuidAndAccount(Long guid, Long accountId);

    Optional<CharactersEntity> findByGuid(Long guid);

    long countByOnline(Integer online);

    Page<CharactersEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<CharactersEntity> findAllByOrderByLevelDesc(Pageable pageable);

    long count();
}
