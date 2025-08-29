/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";
import useAdminUsersQuery from "../../../queries/AdminQuery/useAdminUsersQuery";
import useAdminCommunityQuery from "../../../queries/AdminQuery/useAdminCommunityQuery";
import useAdminFoodQuery from "../../../queries/AdminQuery/useAdminFoodQuery";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { baseURL } from "../../../api/axios/axios";
import LeftSideBar from "../../../components/LeftSideBar/LeftSideBar";
import DataTable from "../../../components/DataTable/DataTable";
import { usePageStore } from "../../../stores/usePageStore";
import useAdminNoticeQuery from "../../../queries/AdminQuery/useAdminNoticeQuery";
import {
  communityCategory,
  communityCols,
  foodCols,
  noticeCategory,
  noticeCols,
  usersCols,
} from "../../../constants/adminPage/adminPageCategory";
import { useAdminModalStore } from "../../../stores/useAdminModalStore";
import AdminModal from "../../../components/AdminModal/AdminModal";
import {
  reqAdminAllDeleteCommunity,
  reqAdminAllDeleteFood,
  reqAdminAllDeleteNotice,
  reqAdminAllDeleteUsers,
} from "../../../api/adminApi/adminApi";
import NoticeManagement from "../NoticeManagement/NoticeManagement";
import FoodManagement from "../FoodManagement/FoodManagement";
import CommunityManagement from "../CommunityManagement/CommunityManagement";
import UserMangement from "../UserManagement/UserMangement";

function AdminManage(props) {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const principalQuery = usePrincipalQuery();

  const { openModal, setOpenModal } = useAdminModalStore();
  const [mode, setMode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const user = principalQuery?.data?.data?.body?.user || [];
  const userStatus = principalQuery?.data?.data?.body?.myStatus || [];

  const { page, setPage } = usePageStore();

  const adminUsers = useAdminUsersQuery(page, 10, inputValue);
  const adminCommunity = useAdminCommunityQuery(
    page,
    10,
    categoryId,
    inputValue
  );
  const adminFood = useAdminFoodQuery(page, 10, inputValue);
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

  const handleSearchOnClick = () => {};

  const users = adminUsers?.data?.data?.body;
  const userList = adminUsers?.data?.data?.body?.content || []; // user 리스트

  const community = adminCommunity?.data?.data?.body; // community 리스트
  const communityList = community?.content.map((community) => ({
    ...community,
    ...community.user,
    ...community.communityCategory,
  }));

  const food = adminFood?.data?.data?.body; //food 리스트
  const foodList = food?.content.map((food) => ({
    ...food,
    ...food.foodCategory,
    ...food.user,
  }));

  // console.log(userStatus);
  // console.log(user);
  // console.log(users);
  // console.log(communityList);
  // console.log(foodList);
  // console.log(params);
  // console.log(food);
  // console.log(notice);
  // console.log(noticeList);

  const handleOpenModalOnClick = (mode) => {
    setOpenModal(true);
    setMode(mode);
  };

  const handelAllDeleteClick = async (ids) => {
    if (params.categoryId === "users") {
      console.log(params.categoryId);
      console.log(ids);
      await reqAdminAllDeleteUsers(ids);
      adminUsers.refetch();
      return;
    }
    if (params.categoryId === "community") {
      await reqAdminAllDeleteCommunity(ids);
      adminCommunity.refetch();
      return;
    }
    if (params.categoryId === "food") {
      await reqAdminAllDeleteFood(ids);
      adminFood.refetch();
      return;
    }
  };

  useEffect(() => {
    setPage(1);
    setInputValue("");
  }, [params.categoryId]);

  return (
    <div css={s.layout}>
      <div css={s.manageContainer}>
        <LeftSideBar />
        <div css={s.manageLayout}>
          <div css={s.manageUser}>
            <div>
              <img src={`${user?.profileImgUrl}`} alt="" css={s.profileImg} />
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
                      <img src={user?.profileImgUrl} alt="" />
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
                        <span>{userStatus?.postCount}개</span>
                      </div>
                      <div>
                        <span>내가 쓴 댓글</span>
                        <span>{userStatus?.commentCount}개</span>
                      </div>
                    </div>
                  </div>
                </ReactModal>
              ) : (
                <></>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/users" element={<UserMangement />} />
            <Route path="/community" element={<CommunityManagement />} />
            <Route path="/food" element={<FoodManagement />} />
            <Route path="/notice" element={<NoticeManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminManage;
