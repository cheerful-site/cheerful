package com.korit.cheerful_back.security.handler;

import com.korit.cheerful_back.security.filter.JwtFilter;
import com.korit.cheerful_back.security.jwt.JwtUtil;
import com.korit.cheerful_back.security.model.PrincipalUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  private final JwtUtil jwtUtil;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
    String accessToken = jwtUtil.generateAccessToken(principalUser.getUser());
    response.sendRedirect("http://localhost:5173/auth/oauth2/login?accessToken=" + accessToken);
  }
}