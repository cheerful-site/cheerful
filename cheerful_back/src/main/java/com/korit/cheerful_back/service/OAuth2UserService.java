package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.security.model.PrincipalUser;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {
  private final UserMapper userMapper;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    String registerationId = userRequest.getClientRegistration().getRegistrationId();
    String email = null;
    String name = null;
    String providerId = null;

    OAuth2User oAuth2User = super.loadUser(userRequest);
    
    if ("google".equals(registerationId)) {
      email = oAuth2User.getAttribute("email");
      name = oAuth2User.getAttribute("name");
      providerId = oAuth2User.getAttribute("sub");
    } else if ("kakao".equals(registerationId)) {
      Map<String, Object> attributes = oAuth2User.getAttributes();
      Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
      Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
      email = kakaoAccount.get("email").toString();
      name = profile.get("nickname").toString();
      providerId = attributes.get("id").toString();
    } else if ("naver".equals(registerationId)) {
      Map<String, Object> attributes = oAuth2User.getAttributes();
      Map<String, Object> naverAccount = (Map<String, Object>) attributes.get("naver_account");
      Map<String, Object> profile = (Map<String, Object>) naverAccount.get("profile");
      email = naverAccount.get("email").toString();
      name = profile.get("nickname").toString();
      providerId = attributes.get("id").toString();
    }

    User user = userMapper.findByUserName(email);

    return PrincipalUser.builder()
        .user(user)
        .attributes(oAuth2User.getAttributes())
        .build();

  }

}
