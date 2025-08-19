/**@jsxImportSource @emotion/react */
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import noImage from "../../icons/Frame2.png";
import * as s from "./styles";
import useFoodListQuery from "../../queries/FoodQuery/useFoodListQuery";

function Food(props) {
  const [page, setPage] = useState(1);
  const foodList = useFoodListQuery(page, 10);
  const food = [
    {
      id: 1,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 2,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 3,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 4,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 5,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 6,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 7,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 8,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 9,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 10,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 11,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 12,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 13,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 14,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 15,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
    {
      id: 16,
      foodName: "foodName",
      price: "10,000원",
      category: "간식",
    },
  ];

  console.log(foodList);

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
          {food.map((food) => (
            <div key={food.id}>
              <img src={noImage} alt="" />
              <div>
                <span>{food.foodName}</span>
                <span>{food.price}</span>
                <span>{food.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Food;
