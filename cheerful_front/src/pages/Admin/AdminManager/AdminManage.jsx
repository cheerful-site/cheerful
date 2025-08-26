/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link, useNavigate, useParams } from "react-router-dom";
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

  const { page } = usePageStore();

  const adminUsers = useAdminUsersQuery(page, 10, inputValue);
  const adminCommunity = useAdminCommunityQuery(
    page,
    10,
    categoryId,
    inputValue
  );
  const adminFood = useAdminFoodQuery(page, 10, inputValue);
  const adminNotice = useAdminNoticeQuery(page, 10, categoryId, inputValue);

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

  const notice = adminNotice?.data?.data?.body;
  const noticeList = notice?.content.map((notice) => ({
    ...notice,
    ...notice.noticeCategory,
    ...notice.user,
  }));

  // console.log(user);
  console.log(users);
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
    if (params.categoryId === "notice") {
      await reqAdminAllDeleteNotice(ids);
      adminNotice.refetch();
      return;
    }
  };

  useEffect(() => {
    //페이지 이동시 1번 페이지로 이동하도록
  }, [params.categoryId]);

  return (
    <div css={s.layout}>
      <AdminModal mode={mode} categoryName={params.categoryId} />
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
                  placeholder="Search for ..."
                  onChange={handleOnChange}
                />
                <FaSearch />
              </div>
              {params.categoryId === "users" ? (
                <>
                  <DataTable
                    isCheckBoxEnabled={true}
                    cols={usersCols}
                    rows={userList}
                    pagenation={users}
                    categoryName={params.categoryId}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    refetch={adminUsers}
                    enabledDeleteButton={true}
                    enabledRegisterButton={false}
                    onDelete={handelAllDeleteClick}
                  />
                </>
              ) : params.categoryId === "community" ? (
                <>
                  <DataTable
                    isCheckBoxEnabled={true}
                    cols={communityCols}
                    rows={communityList}
                    pagenation={community}
                    enabledCategoryList={true}
                    categoryList={communityCategory}
                    categoryName={params.categoryId}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    refetch={adminCommunity}
                    enabledDeleteButton={true}
                    enabledRegisterButton={false}
                    onDelete={handelAllDeleteClick}
                  />
                </>
              ) : params.categoryId === "food" ? (
                <>
                  <DataTable
                    isCheckBoxEnabled={true}
                    cols={foodCols}
                    rows={foodList}
                    pagenation={food}
                    categoryName={params.categoryId}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    enabledDeleteButton={true}
                    enabledRegisterButton={true}
                    onRegister={() => handleOpenModalOnClick("register")}
                    onDelete={handelAllDeleteClick}
                    setMode={setMode}
                  />
                </>
              ) : params.categoryId === "notice" ? (
                <>
                  <DataTable
                    isCheckBoxEnabled={true}
                    cols={noticeCols}
                    rows={noticeList}
                    pagenation={notice}
                    enabledCategoryList={true}
                    categoryList={noticeCategory}
                    categoryName={params.categoryId}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    enabledDeleteButton={true}
                    enabledRegisterButton={true}
                    onRegister={() => handleOpenModalOnClick("register")}
                    onDelete={handelAllDeleteClick}
                    setMode={setMode}
                  />
                </>
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
