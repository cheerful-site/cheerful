/**@jsxImportSource @emotion/react */
import { HiUsers } from "react-icons/hi";
import * as s from "./styles";
import { TbDogBowl } from "react-icons/tb";
import { ImNotification } from "react-icons/im";
import { PiUserCircleFill } from "react-icons/pi";
import logo from "../../logo/cheerful_login.png";
import { Link } from "react-router-dom";

function LeftSideBar(props) {
  const adminCategory = [
    {
      id: 1,
      name: "Community",
      category: "community",
      path: "/admin/community",
      icon: <HiUsers />,
    },
    {
      id: 2,
      name: "Food",
      category: "food",
      path: "/admin/food",
      icon: <TbDogBowl />,
    },
    {
      id: 3,
      name: "Notice",
      category: "notice",
      path: "/admin/notice",
      icon: <ImNotification />,
    },
  ];
  return (
    <>
      <div css={s.manageCategory}>
        <div css={s.logoContainer}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div css={s.categoryUser(location.pathname === "/admin/users")}>
          <div>
            <span>User</span>
            <Link to={"/admin/users"}>
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
    </>
  );
}

export default LeftSideBar;
