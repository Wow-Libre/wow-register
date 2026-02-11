package com.emulator_wow_web.wowr_register.infrastructure.persistence;

import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.CharactersEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CharactersRepository extends JpaRepository<CharactersEntity, com.emulator_wow_web.wowr_register.infrastructure.entities.characters.dto.CharacterId> {

    List<CharactersEntity> findByAccountOrderByLevelDesc(Long accountId);

    Optional<CharactersEntity> findByGuidAndAccount(Long guid, Long accountId);

    Optional<CharactersEntity> findByGuid(Long guid);

    long countByOnline(Integer online);

    Page<CharactersEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<CharactersEntity> findAllByOrderByLevelDesc(Pageable pageable);

    long count();
}
