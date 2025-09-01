/**@jsxImportSource @emotion/react */
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import * as s from "./styles";
import { useCallback, useMemo, useState } from "react";

function FoodImgSlider({ images = [] }) {
  const capped = useMemo(() => images.slice(0, 5), [images]);
  const [index, setIndex] = useState(0);
  console.log(capped);

  const prev = useCallback(() => {
    if (!capped.length) return;
    setIndex((i) => (i - 1 + capped.length) % capped.length);
  }, [capped.length]);

  const next = useCallback(() => {
    if (!capped.length) return;
    setIndex((i) => (i + 1) % capped.length);
  }, [capped.length]);

  return (
    <>
      <div>
        <img src={`${capped[index]}`} alt="" />
      </div>
      <div>
        {capped?.map((image, i) => (
          <img key={i} src={`${image}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </>
  );
}

export default FoodImgSlider;
