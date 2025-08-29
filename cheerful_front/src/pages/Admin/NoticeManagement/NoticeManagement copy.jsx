/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import React from "react";

function NoticeManagement(props) {
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

  const notice = adminNotice?.data?.data?.body;
  const noticeList = notice?.content.map((notice) => ({
    ...notice,
    ...notice.noticeCategory,
    ...notice.user,
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
    if (params.categoryId === "notice") {
      await reqAdminAllDeleteNotice(ids);
      adminNotice.refetch();
      return;
    }
  };

  useEffect(() => {
    setPage(1);
    setInputValue("");
  }, [params.categoryId]);

  return (
    <div css={s.manageContent}>
      <div>
        <div css={s.manageSearch}>
          <input
            type="text"
            placeholder="Search for ..."
            onChange={handleOnChange}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleSearchOnClick();
            }}
          />
          <FaSearch onClick={handleSearchOnClick} />
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
  );
}

export default NoticeManagement;
