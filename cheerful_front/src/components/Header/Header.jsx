/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePrincipalQuery from "../../queries/PrincipalQuery/usePrincipalQuery";
import ReactModal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";

function Header(props) {
  const [login, setLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalQuery = usePrincipalQuery();
  const user = principalQuery?.data?.data.body.user;
  // console.log(user);

  const MENU = [
    {
      id: 1,
      title: "HOME",
      path: "/",
    },
    {
      id: 2,
      title: "Community",
      path: "/community/1",
    },
    {
      id: 3,
      title: "Food",
      path: "/food",
    },
    {
      id: 4,
      title: "Map",
      path: "/map/1",
    },
    {
      id: 5,
      title: "Notice",
      path: "/notice/1",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (!!token) {
      setLogin(true);
      return;
    } else {
      setLogin(false);
      return;
    }
  }, [localStorage.getItem("AccessToken")]);

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

  return (
    <div css={s.layout}>
      <div>
        <Link to={"/"}>
          <img css={s.headerLogo} src="../../logo/cheerful_header.png" alt="" />
        </Link>
      </div>

      <div css={s.category}>
        {MENU.map((menu) => (
          <Link
            key={menu.id}
            css={s.checkedPath(location.pathname === menu.path)}
            to={menu.path}>
            {menu.title}
          </Link>
        ))}
      </div>

      {login === false ? (
        <Link to={"/auth/login"} css={s.loginButton}>
          로그인
        </Link>
      ) : (
        <div css={s.profile}>
          <div css={s.searchIconBox}>
            <Link to={"/search"}>
              <FaSearch css={s.searchIcon} />
            </Link>
          </div>
          <div css={s.profileImgBox}>
            <img src={user?.profileImgPath} alt="" css={s.profileImg} />
          </div>
          <div css={s.profileEdit} onClick={handleProfileOnClick}>
            <div>{user?.username}</div>
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
                isOpen={isOpen}>
                <div css={s.modalContainer}>
                  <div css={s.modalProfile}>
                    <img src={user?.profileImgPath} alt="" />
                    <span>{user?.username}</span>
                  </div>

                  <div css={s.modalButton}>
                    <Link to={""}>글쓰기</Link>
                    {user?.role === "ROLE_ADMIN" ? (
                      <Link to={""}>관리자 페이지</Link>
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
      )}
    </div>
  );
}

export default Header;
