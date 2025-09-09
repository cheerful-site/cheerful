/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

function PageNation({ page, setPage, size, totalElements, totalPage }) {
  const numPages = Math.ceil(totalElements / size) || [];
  // console.log(page);

  return (
    <div css={s.layout}>
      <RxDoubleArrowLeft
        css={s.pageLeftButton(page === 1)}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      />
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            css={s.pageNumberButton(parseInt(page))}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}>
            {i + 1}
          </button>
        ))}
      <RxDoubleArrowRight
        css={s.pageRightButton(page === numPages)}
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      />
    </div>
  );
}

export default PageNation;
