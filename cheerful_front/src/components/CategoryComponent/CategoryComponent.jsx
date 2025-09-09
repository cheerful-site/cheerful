/**@jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as s from "./styles";

function CategoryComponent({ cate, category, route }) {
  return (
    <>
      <Link
        css={s.category(parseInt(category) === cate.category)}
        key={cate.id}
        to={`/${route}/${cate.category}`}>
        {cate.title}
      </Link>
    </>
  );
}

export default CategoryComponent;
