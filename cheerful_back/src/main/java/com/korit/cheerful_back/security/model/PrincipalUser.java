package com.korit.cheerful_back.security.model;

import com.korit.cheerful_back.domain.user.User;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

/*
  Security 인증 주체(Principal)
 */
@Builder
@Data
public class PrincipalUser implements UserDetails, OAuth2User {
  private User user;
  private Map<String, Object> attributes;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));
  }

  @Override
  public String getPassword() {
    return "";
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  @Override
  public String getName() {
    return user.getUsername();
  }

}