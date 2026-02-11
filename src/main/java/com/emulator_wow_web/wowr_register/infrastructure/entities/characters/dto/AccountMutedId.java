package com.emulator_wow_web.wowr_register.infrastructure.entities.characters.dto;

import java.io.*;
import java.util.*;

public class AccountMutedId implements Serializable {
  private Long guid;
  private Long mutedate;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    AccountMutedId that = (AccountMutedId) o;
    return Objects.equals(guid, that.guid) &&
           Objects.equals(mutedate, that.mutedate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(guid, mutedate);
  }
}
