/**@jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import Footer from "../../../components/Footer/Footer";
import useFoodListQuery from "../../../queries/FoodQuery/useFoodListQuery";
import PageNation from "../../../components/PageNation/PageNation";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

function Food(props) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [sortName, setSortName] = useState("rank");
  const food = useFoodListQuery(sortName, page, 16);

  const sortList = [
    {
      id: 1,
      label: "똥꼬발랄 랭킹순",
    },
    {
      id: 2,
      label: "낮은 가격순",
    },
    {
      id: 3,
      label: "높은 가격순",
    },
    {
      id: 4,
      label: "최신순",
    },
  ];

  useEffect(() => {
    if (active === 1) {
      setSortName("rank");
    }
    if (active === 2) {
      setSortName("price_asc");
    }
    if (active === 3) {
      setSortName("price_desc");
    }
    if (active === 4) {
      setSortName("new");
    }
  }, [active]);

  const foodPages = food?.data?.data?.body;
  const foodList = food?.data?.data?.body?.content;

  // console.log(foodList);

  const handleDetailOnClick = (foodId) => {
    navigate(`/food/${foodId}`);
  };

  return (
    <div css={s.layout}>
      {food.isLoading && <Loading />}
      <div css={s.foodTitle}>
        <h1>
          우리 아이가 제일 좋아하는 <span>그 맛</span>, 여기 다 있어요!
        </h1>
        <h3>잘 먹고 잘 노는 게 제일 중요하니까!</h3>
      </div>

      <div css={s.horizon}></div>

      <div>
        <div css={s.foodSort}>
          {sortList.map((s) => (
            <span
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                fontWeight: active === s.id ? "700" : "400",
              }}>
              {s.label}
            </span>
          ))}
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
