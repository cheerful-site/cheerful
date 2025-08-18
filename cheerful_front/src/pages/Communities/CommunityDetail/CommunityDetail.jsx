/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useCommunityDetailQuery from "../../../queries/CommunityQuery/useCommunityDetail";
import Footer from "../../../components/Footer/Footer";

function CommunityDetail(props) {
  const params = useParams();
  const communityDetail = useCommunityDetailQuery(
    params.category,
    params.communityId
  );

  console.log(params.category);
  console.log(communityDetail?.data);

  useEffect(() => {}, []);

  return (
    <>
      <div css={s.layout}>
        <div>
          <div css={s.categoryContainer}>
            {/* categoryname */}
            <span>커뮤니티</span>
            <span> &gt; </span>
            <span>강아지</span>
          </div>
          <div css={s.postContainer}>
            <div css={s.content}>
              <div css={s.contentTitle}>
                <span>Title</span>
                <div>
                  <span>username</span>
                  <span>xxxx.xx.xx</span>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>

            <div css={s.postLike}>
              <span>공감해요 0</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityDetail;
