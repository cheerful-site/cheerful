/**@jsxImportSource @emotion/react */
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import * as s from "./styles";
import logo from "../../../../logo/cheerful_login.png";
import { PiUserCircleFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { TbDogBowl } from "react-icons/tb";
import { ImNotification } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import usePrincipalAdminQuery from "../../../queries/PrincipalAdminQuery/usePrincipalAdminQuery";

function AdminManage(props) {
  const principalAdmin = usePrincipalAdminQuery();
  const principal = usePrincipalQuery();
  const location = useLocation();

  console.log(principal?.data?.data);
  console.log(principalAdmin?.data?.data);

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
            <img src={logo} alt="" />
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
            <img src={""} alt="" />
            <span>{}</span>
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
