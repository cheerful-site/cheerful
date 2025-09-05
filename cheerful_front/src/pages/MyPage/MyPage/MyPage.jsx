/**@jsxImportSource @emotion/react */
import { IoSettingsSharp } from "react-icons/io5";
import Footer from "../../../components/Footer/Footer";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import * as s from "./styles";
import { RiEdit2Fill } from "react-icons/ri";
import useMyPageCommunity from "../../../queries/MyPageQuery/useMyPageCommunity";

function MyPage(props) {
  const principal = usePrincipalQuery();
  const user = principal?.data?.data?.body?.user;
  const status = principal?.data?.data?.body?.myStatus;
  // console.log(principal?.data?.data?.body);

  const myCommunity = useMyPageCommunity(1, 5);

  console.log(myCommunity?.data?.data?.body);

  const handleChangeProfileOnClick = () => {};
  const handleChangeUsernameOnClick = () => {};
  const handleDeleteUserOnClick = (userId) => {};

  return (
    <>
      <div css={s.layout}>
        <div css={s.profileContainer}>
          <div css={s.profileImg}>
            <img src={user?.profileImgUrl} alt="" />
            <div onClick={handleChangeProfileOnClick}>
              <IoSettingsSharp />
            </div>
          </div>

          <div css={s.profileInfo}>
            <div>
              <span>{user?.name}</span>
              <RiEdit2Fill onClick={handleChangeUsernameOnClick} />
            </div>
            <div>
              <span>Google</span>
              <span>jbojsun@gmail.com</span>
            </div>
            <div css={s.postAndcomment}>
              <div css={s.postCount}>
                <span>내가 쓴 글</span>
                <span>{status?.communityPosts}개</span>
              </div>
              <div>
                <span>내가 쓴 댓글</span>
                <span>{status?.commentCount}개</span>
              </div>
              <div>
                <span>찜목록</span>
                <span>n개</span>
              </div>
            </div>
            <div css={s.deleteUser}>
              <span onClick={() => handleDeleteUserOnClick()}>탈퇴하기</span>
            </div>
          </div>
        </div>

        <div css={s.contentContainer}>
          <div css={s.postList}></div>
          <div css={s.commentsList}></div>
          <div css={s.likeList}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;
