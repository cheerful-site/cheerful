package com.korit.cheerful_back.service;

import com.korit.cheerful_back.dto.openAi.ChatCompletionDto;
import com.korit.cheerful_back.dto.openAi.CompletionDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/*
    OpenAI 연동 서비스 인터페이스
 */
public interface ChatGPTService {

    // 사용 가능한 모델 목록 조회
    List<Map<String,Object>> modelList();
    // 특정 모델이 유효한지 확인
    Map<String, Object> isValidModel(String modelName);
    // (구버전) text completion 호출
    Map<String, Object> legacyPrompt(CompletionDto completionDto);
    // (신버전) chat completion 호출
    Map<String, Object> prompt(ChatCompletionDto chatCompletionDto);
}
