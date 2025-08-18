/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { HiUsers } from 'react-icons/hi';
import { ImNotification } from 'react-icons/im';
import { PiUserCircleFill } from 'react-icons/pi';
import { TbDogBowl } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import logo from "../../../../logo/cheerful_login.png";

function LeftSideBar(props) {
    
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
    );
}

export default LeftSideBar;