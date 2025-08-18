/**@jsxImportSource @emotion/react */
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePrincipalAdminQuery from "../../../queries/PrincipalAdminQuery/usePrincipalAdminQuery";
import { useState } from "react";
import ReactModal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";
import useAdminUsersQuery from "../../../queries/AdminQuery/useAdminUsersQuery";
import useAdminCommunityQuery from "../../../queries/AdminQuery/useAdminCommunityQuery";
import useAdminFoodQuery from "../../../queries/AdminQuery/useAdminFoodQuery";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import DataTable from "../DataTable/DataTable";

function AdminManage(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalAdmin = usePrincipalAdminQuery();
  const [inputValue, setInputValue] = useState("");

  const adminUsers = useAdminUsersQuery(1, 10, inputValue);
  const adminCommunity = useAdminCommunityQuery(1, 10, 1, inputValue);
  const adminFood = useAdminFoodQuery(1, 10, inputValue);

  const [isOpen, setIsOpen] = useState(false);

  const handleProfileOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogoutOnClick = async () => {
    localStorage.removeItem("AccessToken");
    await queryClient.invalidateQueries({
      queryKey: ["principal"],
    });
    navigate("/auth/login");
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const admin = principalAdmin?.data?.data.body.user; // admin 정보
  const userList = adminUsers?.data?.data.body.content || []; // user 리스트
  const communityList = adminCommunity?.data?.data.body.content; // community 리스트
  const adminFoodList = adminFood?.data?.data.body; //food 리스트

  console.log(communityList);
  console.log(userList);
  console.log(adminFoodList);

  const cols = [
    {
      field: "userId",
      label: "UserId",
      size: "20rem",
    },
    {
      field: "username",
      label: "Username",
      size: "20rem",
    },
    {
      field: "email",
      label: "Email",
      size: "20rem",
    },
    {
      field: "profileImg",
      label: "Profile Img Path",
      size: "20rem",
    },
    {
      field: "provider",
      label: "Provider",
      size: "20rem",
    },
    {
      field: "providerId",
      label: "ProviderId",
      size: "20rem",
    },
  ]


  return (
    <div css={s.layout}>
      <div css={s.manageContainer}>
        <LeftSideBar />
        <div css={s.manageLayout}>
          <div css={s.manageUser}>
            <div css={s.profileImgBox}>
              <img src={admin?.profileImgPath} alt="" css={s.profileImg} />
            </div>
            <div css={s.profileEdit} onClick={handleProfileOnClick}>
              <div>{admin?.adminName}</div>
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
                  <div css={s.modalContainer}>
                    <div css={s.modalProfile}>
                      <img src={admin?.profileImgPath} alt="" />
                      <span>{admin?.adminName}</span>
                    </div>

                    <div css={s.modalButton}>
                      <Link to={"/community/register"}>글쓰기</Link>
                      {admin ? (
                        <Link to={"/admin/manager/users"}>관리자 페이지</Link>
                      ) : (
                        <></>
                      )}
                      <div onClick={handleLogoutOnClick}>로그아웃</div>
                    </div>

                    <div css={s.horizon}></div>

                    <div css={s.modalContent}>
                      <div>
                        <span>내가 쓴 글</span>
                        <span>10개</span>
                      </div>
                      <div>
                        <span>내가 쓴 댓글</span>
                        <span>10개</span>
                      </div>
                    </div>
                  </div>
                </ReactModal>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div css={s.manageContent}>
            <div>
              <div css={s.manageSearch}>
                <input
                  type="text"
                  placeholder="Search for username or email..."
                  onChange={handleOnChange}
                />
                <FaSearch />
              </div>
              <DataTable isCheckBoxEnabled={false} cols={cols} rows={userList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManage;
