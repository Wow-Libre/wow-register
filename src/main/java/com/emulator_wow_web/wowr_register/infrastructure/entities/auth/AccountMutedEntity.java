package com.emulator_wow_web.wowr_register.infrastructure.entities.auth;

import com.emulator_wow_web.wowr_register.infrastructure.entities.characters.dto.*;
import jakarta.persistence.*;
import lombok.*;

import java.io.*;
@IdClass(AccountMutedId.class)

@Data
@Entity
@Table(name = "account_muted")
public class AccountMutedEntity implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long guid;
  @Column(name = "mutedate")
  private Long mutedate;
  @Column(name = "mutetime")
  private Long muteTime;
  @Column(name = "mutedby")
  private String mutedBy;
  @Column(name = "mutereason")
  private String muteReason;


}
