/**@jsxImportSource @emotion/react */
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import * as s from "./styles";
import logo from "../../../../logo/cheerful_login.png";
import { PiUserCircleFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { TbDogBowl } from "react-icons/tb";
import { ImNotification } from "react-icons/im";

function AdminManage(props) {
  const principalUser = usePrincipalQuery();
  const user = principalUser?.data?.data.body.user;
  console.log(user);

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

  const adminCategory = [{}];

  return (
    <div css={s.layout}>
      <div css={s.manageContainer}>
        <div css={s.manageCategory}>
          <div css={s.logoContainer}>
            <img src={logo} alt="" />
          </div>
          <div css={s.categoryUser}>
            <div>
              <span>User</span>
              <div>
                <PiUserCircleFill />
                <span>Users</span>
              </div>
            </div>
          </div>
          <div css={s.categoryAdmin}>
            <div>
              <span>Admin</span>
              <div>
                <HiUsers />
                <span>Community</span>
              </div>
              <div>
                <TbDogBowl />
                <span>Food</span>
              </div>
              <div>
                <ImNotification />
                <span>Notice</span>
              </div>
            </div>
          </div>
        </div>
        <div css={s.manageLayout}>
          <div css={s.manageUser}>
            <img src={user?.profileImgPath} alt="" />
            <span>{user?.username}</span>
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManage;
