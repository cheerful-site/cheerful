/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
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
              <div css={s.manageTable}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManage;
