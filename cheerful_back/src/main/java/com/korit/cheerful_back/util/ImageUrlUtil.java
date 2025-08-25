package com.korit.cheerful_back.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Data
public class ImageUrlUtil {

  private final AppProperties appProperties;

  public String buildImageUrl(String imageUrl, String imageConfigName) {
    if(imageConfigName == null) {
      return null;
    }

    if(!appProperties.getImageConfigs().containsKey(imageConfigName)) {
      return null;
    }

    String prefix = appProperties.getImageConfigs().get(imageConfigName).getPrefix();
    String defaultImg = appProperties.getImageConfigs().get(imageConfigName).getDefaultImg();

    if(imageUrl == null) {
      return prefix + "/" + defaultImg;
    }

    if(imageUrl.startsWith("http")) {
      return imageUrl;
    }

    return prefix + "/" + imageUrl;

  }

  public String profile(String path) {
    return buildImageUrl(path, "profile");
  }
  public String community(String path) {
    return buildImageUrl(path, "community");
  }
  public String food(String path) {
    return buildImageUrl(path, "food");
  }
  public String foodComment(String path) {
    return buildImageUrl(path, "foodComment");
  }
  public String notice(String path) {
    return buildImageUrl(path, "notice");
  }
  public String noticeComment(String path) {
    return buildImageUrl(path, "noticeComment");
  }

}
