/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import usePrincipalQuery from "../../queries/PrincipalQuery/usePrincipalQuery";
import {
  reqMypageDeleteMemberShip,
  reqMypageModifyProfileImage,
  reqMypageModifyProfileName,
} from "../../api/mypageApi/mypageApi";
import MyPost from "../../components/MyPageComponents/MyPost/MyPost";
import MyComments from "../../components/MyPageComponents/MyComments/Mycomments";
import MyLike from "../../components/MyPageComponents/MyLike/MyLike";
import { RiEdit2Fill } from "react-icons/ri";
import Footer from "../../components/Footer/Footer";

function MyPage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const fileRef = useRef();
  const queryClient = useQueryClient();
  const principal = usePrincipalQuery();
  const [inputValue, setInputValue] = useState("");
  const [inputModifyValue, setInputModifyValue] = useState("");
  const navigate = useNavigate();
  const user = principal?.data?.data?.body?.user;
  const status = principal?.data?.data?.body?.myStatus;
  // console.log(principal?.data?.data?.body);

  const handleFileOnChange = async (e) => {
    // console.log(e.target.files);
    const { name, files } = e.target;

    if (!files.length) {
      return;
    }
    const formData = new FormData();
    formData.append(name, files[0]);

    if (confirm("프로필이미지를 수정하시겠습니까?")) {
      try {
        const response = await reqMypageModifyProfileImage(formData);
        console.log(response);
        alert("프로필 이미지를 수정하였습니다.");
        await principal.refetch();
      } catch (error) {
        alert("이미지 변경에 실패하였습니다.");
        console.log(error);
      }
    }
  };

  const handleChangeProfileOnClick = (e) => {
    fileRef.current.click();
  };

  const handleChangeUsernameOnClick = async () => {
    if (confirm("닉네임을 변경하시겠습니까?")) {
      try {
        console.log(inputModifyValue);
        await reqMypageModifyProfileName(inputModifyValue);
        alert("닉네임이 변경되었습니다.");
        setIsInputOpen(false);
        await principal.refetch();
        //유저 닉네임 변경시 리패치 해도 안됨?
      } catch (error) {
        alert("닉네임 변경이 실패하였습니다.");
        setIsInputOpen(false);
        console.log(error);
      }
    }
  };

  const handleEmailOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleModifyUsernameOnChange = (e) => {
    setInputModifyValue(e.target.value);
  };

  const handleDeleteUserOnClick = async () => {
    if (inputValue === user?.email) {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        try {
          await reqMypageDeleteMemberShip();
          localStorage.removeItem("AccessToken");
          await queryClient.invalidateQueries({
            queryKey: ["principal"],
          });
          navigate("/");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      alert("작성하신 이메일이 동일하지 않습니다. 다시 시도해주세요.");
      setIsModalOpen(false);
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
              <input
                type="file"
                name="file"
                onChange={handleFileOnChange}
                ref={fileRef}
              />
              {/* 이미지 수정 */}
            </div>
          </div>

          <div css={s.profileInfo}>
            <div>
              {isInputOpen ? (
                <div css={s.modifyUsername}>
                  <input type="text" onChange={handleModifyUsernameOnChange} />
                  <div>
                    <button onClick={handleChangeUsernameOnClick}>확인</button>
                    <button onClick={() => setIsInputOpen(false)}>취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{user?.name}</span>
                  <RiEdit2Fill onClick={() => setIsInputOpen(true)} />
                </>
              )}
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
              <span onClick={() => setIsModalOpen(true)}>탈퇴하기</span>
              {isModalOpen ? (
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
                  isOpen={isModalOpen}
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
                      <input type="text" onChange={handleEmailOnChange} />
                    </div>
                    <div css={s.deleteButton}>
                      <button onClick={() => setIsModalOpen(false)}>
                        취소
                      </button>
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
