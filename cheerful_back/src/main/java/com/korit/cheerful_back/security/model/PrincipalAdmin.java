package com.korit.cheerful_back.security.model;

import com.korit.cheerful_back.domain.admin.Admin;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
public class PrincipalAdmin implements UserDetails {
  private Admin admin;
  private Map<String, Object> attributes;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
//    return Collections.singletonList(new SimpleGrantedAuthority(admin.getRole()));
    String role = admin.getRole(); // 또는 admin.getRole()
    String authority = role != null && role.startsWith("ROLE_") ? role : "ROLE_" + role;
    return List.of(new SimpleGrantedAuthority(authority));
  }

  @Override
  public String getPassword() {
    return "";
  }

  @Override
  public String getUsername() {
    return "";
  }

}
