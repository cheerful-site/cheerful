package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.dto.community.CommunityHomeDto;
import com.korit.cheerful_back.util.ImageUrlUtil;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HomeService {

  private final CommunityMapper communityMapper;
  private final FoodMapper foodMapper;
  private final ImageUrlUtil imageUrlUtil;

  private static final int MISSING_ID = 6;    // 실종/목격
  private static final int FOSTER_ID = 7;     // 임보/입양

  public CommunityHomeDto getCommunityCards() {
    var mostLiked = one(communityMapper.findTopCommunity(1, "likes", 1, null));
    var mostViewed = one(communityMapper.findTopCommunity(1, "views", 1, mostLiked != null ? mostLiked.getCommunityId() : null));
    var bestMissing = one(communityMapper.findTopCommunity(MISSING_ID, "mix", 1, null));
    var bestFoster = one(communityMapper.findTopCommunity(FOSTER_ID, "mix", 1, null));

    return new CommunityHomeDto(mostLiked, mostViewed, bestMissing, bestFoster);
  }

  private Community one(List<Community> list) {
    return list.isEmpty() ? null : list.getFirst();
  }

  public List<Food> getFoodCards() {
    List<Food> foods = foodMapper.findTopFood(6);

    foods.forEach(f -> {
      List<FoodImg> imgs = f.getFoodImgs();
      if (imgs != null && !imgs.isEmpty()) {
        imgs.sort(Comparator.comparingInt(FoodImg::getSeq));
        imgs.forEach(img -> img.setImgUrl(imageUrlUtil.food(img.getImgPath())));
      }
    });

    return foods;
  }

}
