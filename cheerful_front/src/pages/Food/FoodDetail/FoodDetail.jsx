/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import useFoodDetailQuery from "../../../queries/FoodQuery/useFoodDetailQuery";
import * as s from "./styles";

function FoodDetail(props) {
  const params = useParams();
  // const foodDetail = useFoodDetailQuery(params.foodId);
  console.log(params.foodId);

  return (
    <div css={s.layout}>
      <div css={s.foodContainer}></div>
      <div css={s.commentsRegister}></div>
      <div css={s.commentsContainer}></div>
    </div>
  );
}

export default FoodDetail;
