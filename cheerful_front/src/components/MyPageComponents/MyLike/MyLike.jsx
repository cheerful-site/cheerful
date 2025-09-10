/**@jsxImportSource @emotion/react */
import { useState } from "react";
import useMyPageFoodLike from "../../../queries/MyPageQuery/useMyPageFoodLike";
import * as s from "./styles";
import PageNation from "../../PageNation/PageNation";
import likeLogo from "../../../logo/cheerful_like.png";
import { Link, useNavigate } from "react-router-dom";
import { reqFoodDislike, reqFoodLike } from "../../../api/foodApi/foodApi";
import { useQueryClient } from "@tanstack/react-query";

function MyLike(props) {
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const like = useMyPageFoodLike(page, 4);
  const likeList = like?.data?.data?.body;
  // console.log(like?.data?.data?.body);

  const handleOnClick = (foodId) => {
    navigate(`/food/${foodId}`);
  };

  const handleDislikeOnClick = async (foodId) => {
    console.log(foodId);
    console.log(queryClient.setQueriesData());
    console.log(queryClient.setQueryData(["mypageFoodLike", page, 4]));
    await reqFoodDislike(foodId).then((reaponse) => {
      queryClient.setQueryData(["mypageFoodLike", page, 4], (prev) => {
        console.log(prev);
        return {
          ...prev,
          data: {
            ...prev.data,
            body: {
              ...prev.data.body,
              content: prev.data.body.content.map((food) => {
                if (food.foodId === foodId) {
                  return {
                    ...food,
                    isLike: false,
                    likeCount: food.likeCount - 1,
                  };
                }
              }),
            },
          },
        };
      });
    });
    await queryClient.invalidateQueries({
      queryKey: ["mypageFoodLike"],
    });
  };

  return (
    <div css={s.layout}>
      <div>찜목록</div>

      <div css={s.foodContainer}>
        {likeList?.content.map((food) => (
          <div key={food?.foodId} css={s.foodList}>
            <div css={s.foodImgContainer}>
              <img
                src={food?.foodImgs[0]?.imgUrl}
                alt=""
                onClick={() => handleOnClick(food?.foodId)}
              />
              <img
                src={likeLogo}
                alt=""
                onClick={() => handleDislikeOnClick(food?.foodId.toString())}
              />
            </div>

            <div css={s.foodInfoLayout}>
              <div css={s.foodInfoContainer}>
                <span>{food?.categoryName}</span>
                <span onClick={() => handleOnClick(food?.foodId)}>
                  {food?.title}
                </span>
                <span>{food?.price.toLocaleString()}원</span>
              </div>
              <Link
                to={food?.address}
                target="_blank"
                rel="noopener noreferrer"
                css={s.foodButton}>
                바로구매
              </Link>
            </div>
          </div>
        ))}
      </div>

      <PageNation
        page={page}
        setPage={setPage}
        size={likeList?.size}
        totalElements={likeList?.totalElements}
      />
    </div>
  );
}

export default MyLike;
