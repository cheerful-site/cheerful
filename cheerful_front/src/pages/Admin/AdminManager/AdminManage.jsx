/**@jsxImportSource @emotion/react */
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import * as s from "./styles";
import logo from "../../../../logo/cheerful_login.png";
import { PiUserCircleFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { TbDogBowl } from "react-icons/tb";
import { ImNotification } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePrincipalAdminQuery from "../../../queries/PrincipalAdminQuery/usePrincipalAdminQuery";
import { useState } from "react";
import ReactModal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";

function AdminManage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const principalAdmin = usePrincipalAdminQuery();
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

  const admin = principalAdmin?.data?.data.body.admin;

  console.log(admin);
  const tableInfo = [
    {
      checked: false,
      userId: 1,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 2,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 3,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 4,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 5,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 6,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 7,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 8,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 9,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
    {
      checked: false,
      userId: 10,
      username: "jane doe",
      email: "jbojsun@naver.com",
      profileImgPath: "a/ddd/ddddd.jpg",
      provider: "google",
      providerId: "123123123",
    },
  ];

  const adminCategory = [
    {
      id: 1,
      name: "Community",
      category: "community",
      path: "/admin/manager/community",
      icon: <HiUsers />,
    },
    {
      id: 2,
      name: "Food",
      category: "food",
      path: "/admin/manager/food",
      icon: <TbDogBowl />,
    },
    {
      id: 3,
      name: "Notice",
      category: "notice",
      path: "/admin/manager/notice",
      icon: <ImNotification />,
    },
  ];

  return (
    <div css={s.layout}>
      <div css={s.manageContainer}>
        <div css={s.manageCategory}>
          <div css={s.logoContainer}>
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div
            css={s.categoryUser(location.pathname === "/admin/manager/users")}>
            <div>
              <span>User</span>
              <Link to={"/admin/manager/users"}>
                <PiUserCircleFill />
                <span>Users</span>
              </Link>
            </div>
          </div>
          <div css={s.categoryAdmin}>
            <div>
              <span>Admin</span>
              {adminCategory.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
                  css={s.adminLink(location.pathname === category.path)}>
                  {category.icon}
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
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
                />
                <FaSearch />
              </div>
              <table css={s.manageTable}>
                <thead>
                  <tr css={s.TableHeader}>
                    <th>
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>UserId</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Profile Img Path</th>
                    <th>Provider</th>
                    <th>ProviderId</th>
                    <th>Del</th>
                  </tr>
                </thead>
                <tbody>
                  {tableInfo.map((info) => (
                    <tr key={info.userId} css={s.userRows}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          value={info.checked}
                        />
                      </td>
                      <td>{info.userId}</td>
                      <td>{info.username}</td>
                      <td>{info.email}</td>
                      <td>{info.profileImgPath}</td>
                      <td>{info.provider}</td>
                      <td>{info.providerId}</td>
                      <td>
                        <FaRegTrashAlt />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManage;
