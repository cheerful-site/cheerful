package com.korit.cheerful_back.service;

import com.korit.cheerful_back.dto.openAi.ChatCompletionDto;
import com.korit.cheerful_back.dto.openAi.CompletionDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ChatGPTService {

    List<Map<String,Object>> modelList();
    Map<String, Object> isValidModel(String modelName);
    Map<String, Object> legacyPrompt(CompletionDto completionDto);
    Map<String, Object> prompt(ChatCompletionDto chatCompletionDto);
}
