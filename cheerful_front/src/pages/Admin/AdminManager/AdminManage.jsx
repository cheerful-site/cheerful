/**@jsxImportSource @emotion/react */
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ReactModal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";
import useAdminUsersQuery from "../../../queries/AdminQuery/useAdminUsersQuery";
import useAdminCommunityQuery from "../../../queries/AdminQuery/useAdminCommunityQuery";
import useAdminFoodQuery from "../../../queries/AdminQuery/useAdminFoodQuery";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { baseURL } from "../../../api/axios/axios";
import LeftSideBar from "../../../components/LeftSideBar/LeftSideBar";
import DataTable from "../../../components/DataTable/DataTable";

function AdminManage(props) {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const principalQuery = usePrincipalQuery();
  const [inputValue, setInputValue] = useState("");
  const user = principalQuery?.data?.data?.body?.user || [];

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

  const userList = adminUsers?.data?.data?.body?.content || []; // user 리스트
  const community = adminCommunity?.data?.data?.body; // community 리스트
  const communityList = community?.content.map((community) => ({
    ...community,
    ...community.user,
    ...community.communityCategory,
  }));
  const foodList = adminFood?.data?.data?.body; //food 리스트

  // console.log(userList);
  console.log(communityList);
  // console.log(foodList);
  // console.log(params);

  const communityCols = [
    {
      filed: "communityId",
      label: "Id",
      size: "6rem",
    },
    {
      filed: "communityCategoryName",
      label: "Category Name",
      size: "6rem",
    },
    {
      filed: "name",
      label: "Username",
      size: "6rem",
    },
    {
      filed: "title",
      label: "Title",
      size: "6rem",
    },
    {
      filed: "content",
      label: "Content",
      size: "6rem",
    },
    {
      filed: "createdAt",
      label: "CreateAt",
      size: "6rem",
    },
  ];

  const usersCols = [
    {
      field: "userId",
      label: "UserId",
      size: "6rem",
    },
    {
      field: "username",
      label: "Username",
      size: "12rem",
    },
    {
      field: "email",
      label: "Email",
      size: "20rem",
    },
    {
      field: "profileImgPath",
      label: "Profile Img Path",
      size: "20rem",
    },
    {
      field: "provider",
      label: "Provider",
      size: "6rem",
    },
    {
      field: "providerId",
      label: "ProviderId",
      size: "20rem",
    },
  ];

  return (
    <div css={s.layout}>
      <div css={s.manageContainer}>
        <LeftSideBar />
        <div css={s.manageLayout}>
          <div css={s.manageUser}>
            <div>
              <img
                src={`${baseURL}/upload/profile/${user?.profileImgPath}`}
                alt=""
                css={s.profileImg}
              />
            </div>
            <div css={s.profileEdit} onClick={handleProfileOnClick}>
              <div>{user?.name}</div>
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
                      <img
                        src={`${baseURL}/upload/profile/${user?.profileImgPath}`}
                        alt=""
                      />
                      <span>{user?.name}</span>
                    </div>

                    <div css={s.modalButton}>
                      <Link to={"/community/register"}>글쓰기</Link>
                      <Link to={"/admin/users"}>관리자 페이지</Link>
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
              {params.categoryId === "users" ? (
                <DataTable
                  isCheckBoxEnabled={true}
                  cols={usersCols}
                  rows={userList}
                />
              ) : params.categoryId === "community" ? (
                <DataTable
                  isCheckBoxEnabled={true}
                  cols={communityCols}
                  rows={communityList}
                />
              ) : params.categoryId === "food" ? (
                <DataTable
                  isCheckBoxEnabled={true}
                  cols={usersCols}
                  rows={userList}
                />
              ) : params.categoryId === "notice" ? (
                <DataTable
                  isCheckBoxEnabled={true}
                  cols={usersCols}
                  rows={userList}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManage;
