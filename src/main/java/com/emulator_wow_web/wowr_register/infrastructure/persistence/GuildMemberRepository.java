package com.emulator_wow_web.wowr_register.infrastructure.persistence;

import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.GuildMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GuildMemberRepository extends JpaRepository<GuildMemberEntity, com.emulator_wow_web.wowr_register.infrastructure.entities.characters.dto.GuildMemberId> {

    @Query("SELECT g FROM GuildMemberEntity g WHERE g.id = :guildId ORDER BY g.rank ASC")
    List<GuildMemberEntity> findByGuildIdOrderByRank(Long guildId);

    Optional<GuildMemberEntity> findByGuid(Long characterGuid);

    @Query("SELECT COUNT(g) FROM GuildMemberEntity g WHERE g.id = :guildId")
    long countByGuildId(Long guildId);
}
