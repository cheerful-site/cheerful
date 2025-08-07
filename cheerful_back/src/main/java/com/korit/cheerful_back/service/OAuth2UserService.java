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
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {
  private final UserMapper userMapper;

  @Override
  @Transactional(rollbackFor = Exception.class)
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    String email = null;
    String name = null;
    String providerId = null;
    String profileImgPath = null;

    OAuth2User oAuth2User = super.loadUser(userRequest);

    Map<String, Object> attributes = oAuth2User.getAttributes();
    // Google에서 제공하는 정보를 가져옴.
    if ("google".equals(registrationId)) {
      email = oAuth2User.getAttribute("email");
      name = oAuth2User.getAttribute("name");
      providerId = oAuth2User.getAttribute("sub");
      profileImgPath = oAuth2User.getAttribute("picture");

    } else if ("kakao".equals(registrationId)) {
      // kakao에서 제공하는 정보를 가져옴.
      attributes = oAuth2User.getAttributes();
      Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
      Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

      email = kakaoAccount.get("email").toString();
      name = profile.get("nickname").toString();
      providerId = attributes.get("id").toString();
      profileImgPath = profile.get("profile_image_url").toString();
    } else if ("naver".equals(registrationId)) {
      Map<String, Object> response = (Map<String, Object>) attributes.get("response");

      email = response.get("email").toString();
      name = response.get("nickname").toString();
      providerId = response.get("id").toString();
      profileImgPath = response.get("profile_image").toString();

    } else {
      throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다: " + registrationId);
    }

    User user = userMapper.findByUserName(email);

    // not null 추가
    if (user == null) {
      user = User.builder()
          .username(name)
          .email(email)
          .role("ROLE_USER")
          .profileImgPath(profileImgPath != null ? profileImgPath : "/upload/profile/default.jpg")
          .provider(registrationId)
          .providerId(providerId)
          .build();

      userMapper.insert(user);
    }

    return PrincipalUser.builder()
        .user(user)
        .attributes(oAuth2User.getAttributes())
        .build();

  }
}
