package com.korit.cheerful_back.config;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

// WebConfig.java
@Configuration
public class WebConfig implements WebMvcConfigurer {

//  @Value("${user.dir}")
//  private String rootPath;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // 프로젝트 루트 기준 절대경로
    String root = System.getProperty("user.dir").replace("\\", "/");
    String uploadDir = root + "/upload/";

    registry.addResourceHandler("/upload/**")
        .addResourceLocations("file:" + uploadDir); // 끝에 / 포함

//    final String uploadPath = rootPath + "/upload";
//    registry.addResourceHandler("/upload/**")
//        .addResourceLocations("file:///" + uploadPath)
//        .resourceChain(true)
//        .addResolver(new PathResourceResolver() {
//          @Override
//          protected Resource getResource(String resourcePath, Resource location) throws IOException {
//            resourcePath = URLDecoder.decode(resourcePath, StandardCharsets.UTF_8);
//            return super.getResource(resourcePath, location);
//          }
//        });
//    WebMvcConfigurer.super.addResourceHandlers(registry);
  }
}

