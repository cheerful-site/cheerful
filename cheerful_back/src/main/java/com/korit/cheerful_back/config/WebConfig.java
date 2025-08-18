package com.korit.cheerful_back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// WebConfig.java
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // 프로젝트 루트 기준 절대경로
    String root = System.getProperty("user.dir").replace("\\", "/");
    String uploadDir = root + "/upload/";

    registry.addResourceHandler("/upload/**")
        .addResourceLocations("file:" + uploadDir); // 끝에 / 포함
  }
}

