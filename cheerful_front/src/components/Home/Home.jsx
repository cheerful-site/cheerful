/**@jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import * as s from "./styles";

function Home(props) {
  return (
    <>
      <div css={s.layout}>
        <div css={s.mainContents}>
          <div css={s.logoContainer}>
            <div></div>
            <div></div>
            <img css={s.logo} src="../../logo/cheerful_mainlogo.png" alt="" />
          </div>

          <div css={s.serachBarContainer}>
            <div>
              <span>똥꼬발랄</span>한 이야기, 여기 다 있어요!
            </div>
            <div>필요한 정보를 빠르게 찾고, 귀여운 친구들과 교류해보세요.</div>
            <div>
              <SearchBar />
            </div>
          </div>

          <div css={s.foodInfo}>
            <div css={s.imgContainer}>
              <img src="src/image/img_dog2.png" alt="" />
              <img src="src/image/img_shiba.png" alt="" />
              <img src="src/image/img_welshcorgi.png" alt="" />
            </div>

            <div css={s.reviewContainer}>
              <span>똥꼬발랄 탐방일지</span>
              <div>
                <div>
                  <span>Food Name</span>
                  <span>⭐️⭐️⭐️⭐️⭐️</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor inci ...
                  </span>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
