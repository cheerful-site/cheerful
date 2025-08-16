import React from "react";

function PageNation({ page, size, totalElements, totalPage, setPage }) {
  const numPages = Math.ceil(totalElements / size);
  console.log(page);
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}>
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </div>
  );
}

export default PageNation;
