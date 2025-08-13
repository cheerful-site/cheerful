package com.korit.cheerful_back.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

/**
 * ChatGPT에서 사용하는 환경 구성
 *
 * @author : lee
 * @fileName : RestTemplate
 * @since : 12/29/23
 */

@Configuration
public class ChatGPTConfig {

    @Value("${chatgpt.api-key}")
    private String secretKey;

    @Bean
    public HttpHeaders httpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate;
    }

    @PostConstruct
    public void debugApiKey() {
        System.out.println("🔍 chatgpt.api-key = " + secretKey);
    }
}
