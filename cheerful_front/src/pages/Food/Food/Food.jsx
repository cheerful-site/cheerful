/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import Footer from "../../../components/Footer/Footer";
import useFoodListQuery from "../../../queries/FoodQuery/useFoodListQuery";
import PageNation from "../../../components/PageNation/PageNation";
import { baseURL } from "../../../api/axios/axios";
import { useNavigate } from "react-router-dom";

function Food(props) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const food = useFoodListQuery(page, 16);

  const foodPages = food?.data?.data?.body;
  const foodList = food?.data?.data?.body?.content;

  // console.log(foodList);

  const handleDetailOnClick = (foodId) => {
    navigate(`/food/${foodId}`);
  };

  return (
    <div css={s.layout}>
      <div css={s.foodTitle}>
        <h1>
          우리 아이가 제일 좋아하는 <span>그 맛</span>, 여기 다 있어요!
        </h1>
        <h3>잘 먹고 잘 노는 게 제일 중요하니까!</h3>
      </div>

      <div css={s.horizon}></div>

      <div>
        <div css={s.foodSort}>
          <span>똥꼬발랄 랭킹순</span>
          <div css={s.dot}></div>
          <span>낮은 가격순</span>
          <div css={s.dot}></div>
          <span>높은 가격순</span>
          <div css={s.dot}></div>
          <span>최신순</span>
        </div>

        <div css={s.foodContainer}>
          {foodList?.map((food) => (
            <div key={food.foodId}>
              <img
                src={`${food.foodImgs[0].imgUrl}`}
                alt=""
                onClick={() => handleDetailOnClick(food.foodId)}
              />
              <div>
                <span onClick={() => handleDetailOnClick(food.foodId)}>
                  {food.title}
                </span>
                <span>{food.price.toLocaleString()}원</span>
                <span>{food.foodCategory?.foodCategoryName}</span>
              </div>
            </div>
          ))}
        </div>
        <PageNation
          page={page}
          setPage={setPage}
          size={foodPages?.size}
          totalElements={foodPages?.totalElements}
          totalPage={foodPages?.totalPages}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Food;
