/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { IoSettingsSharp } from "react-icons/io5";
import Footer from "../../../components/Footer/Footer";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { RiEdit2Fill } from "react-icons/ri";
import MyPost from "../../../components/MyPageComponents/MyPost/MyPost";
import MyComments from "../../../components/MyPageComponents/MyComments/Mycomments";
import MyLike from "../../../components/MyPageComponents/MyLike/MyLike";
import { reqMypageDeleteMemberShip } from "../../../api/mypageApi/mypageApi";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useState } from "react";

function MyPage(props) {
  const [isOpen, setIsOpen] = useState(false);
  const principal = usePrincipalQuery();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const user = principal?.data?.data?.body?.user;
  const status = principal?.data?.data?.body?.myStatus;
  // console.log(principal?.data?.data?.body);

  const handleChangeProfileOnClick = () => {};
  const handleChangeUsernameOnClick = () => {};

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleDeleteUserOnClick = () => {
    if (inputValue === user?.email) {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        try {
          // reqMypageDeleteMemberShip();
          navigate("/");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      alert("작성하신 이메일이 동일하지 않습니다. 다시 시도해주세요.");
      setIsOpen(false);
    }
  };

  return (
    <>
      <div css={s.layout}>
        <div css={s.profileContainer}>
          <div css={s.profileImg}>
            <img src={user?.profileImgUrl} alt="" />
            <div onClick={handleChangeProfileOnClick}>
              <IoSettingsSharp />
              {/* <input type="file" name="" id="" /> */}
              {/* 이미지 수정 */}
            </div>
          </div>

          <div css={s.profileInfo}>
            <div>
              <span>{user?.name}</span>
              <RiEdit2Fill onClick={handleChangeUsernameOnClick} />
              {/* 유저네임 수정 */}
            </div>
            <div>
              <span>{user?.provider}</span>
              <span>{user?.email}</span>
            </div>
            <div css={s.postAndcomment}>
              <div css={s.postCount}>
                <span>내가 쓴 글</span>
                <span>{status?.postCount}개</span>
              </div>
              <div>
                <span>내가 쓴 댓글</span>
                <span>{status?.commentCount}개</span>
              </div>
              <div>
                <span>찜목록</span>
                <span>{status?.likedFoodCount}개</span>
              </div>
            </div>
            <div css={s.deleteUser}>
              <span onClick={() => setIsOpen(true)}>탈퇴하기</span>
              {isOpen ? (
                <ReactModal
                  style={{
                    overlay: {
                      backgroundColor: "#000000cc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 100,
                    },
                    content: {
                      position: "static",
                      border: "none",
                      padding: "0",
                      overflow: "hidden",
                    },
                  }}
                  isOpen={isOpen}
                  appElement={document.getElementById("root")}>
                  <div css={s.deleteUserModal}>
                    <div>
                      <span>회원탈퇴를 하시겠습니까?</span>
                      <span>
                        탈퇴하시면 작성하신 모든 게시글과 댓글이 삭제됩니다.
                      </span>
                      <span>
                        탈퇴를 원하시면 아래 본인 이메일을 동일하게
                        작성해주세요.
                      </span>
                    </div>
                    <div>
                      <span>{user?.email}</span>
                      <input type="text" onChange={handleOnChange} />
                    </div>
                    <div css={s.deleteButton}>
                      <button onClick={() => setIsOpen(false)}>취소</button>
                      <button onClick={handleDeleteUserOnClick}>
                        탈퇴하기
                      </button>
                    </div>
                  </div>
                </ReactModal>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div css={s.contentContainer}>
          <div css={s.postList}>
            <MyPost />
          </div>
          <div css={s.commentsList}>
            <MyComments />
          </div>
          <div css={s.likeList}>
            <MyLike />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;
