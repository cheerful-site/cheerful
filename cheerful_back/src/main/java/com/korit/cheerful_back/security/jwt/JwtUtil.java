package com.korit.cheerful_back.security.jwt;



import com.korit.cheerful_back.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private final long EXPIRED_TIME = 60000 * 60 * 12;
  private final Key KEY;

  public JwtUtil(@Value("${jwt.secret}") String secret) {
    KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
  }

  public String generateAccessToken(User user) {
    return Jwts.builder()
        .subject("cheerful_access_token")
        .issuer("cheerful")
        .expiration(new Date(new Date().getTime() + EXPIRED_TIME))
        .claim("userId", user.getUserId())
        .signWith(KEY)
        .compact();
  }

  public String validateBearerToken(String token) {
    boolean isNull = token == null;
    if (isNull) {
      return null;
    }

    final String TOKEN_NAME = "Bearer ";
    boolean isNotStartedBearer = !token.startsWith(TOKEN_NAME);
    if (isNotStartedBearer) {
      return null;
    }
    // 7글자까지 자르기
    return token.substring(TOKEN_NAME.length());
  }

  public Claims getClaims(String token) {
    try {
      return Jwts.parser().setSigningKey(KEY).build()
          .parseClaimsJws(token).getPayload();
    } catch (JwtException jwtException) {
      return null;
    }
  }

}