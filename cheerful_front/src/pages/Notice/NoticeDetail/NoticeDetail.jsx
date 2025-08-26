/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import useNoticeDetailQuery from "../../../queries/NoticeQuery/useNoticeDetailQuery";
import * as s from "./styles";
import Footer from "../../../components/Footer/Footer";
import { baseURL } from "../../../api/axios/axios";

function NoticeDetail(props) {
  const params = useParams();
  const notice = useNoticeDetailQuery(params.category, params.noticeId);
  const detailContent = notice?.data?.data?.body;

  console.log(detailContent);
  console.log(detailContent?.noticeImgs);

  return (
    <div css={s.layout}>
      <div>
        <div css={s.categoryContainer}>
          {/* categoryname */}
          <span>커뮤니티</span>
          <span> &gt; </span>
          <span>{detailContent?.noticeCategory?.noticeCategoryName}</span>
        </div>
        <div css={s.postContainer}>
          <div css={s.content}>
            <div css={s.contentTitle}>
              <span>{detailContent?.title}</span>
              <div>
                <span>{detailContent?.user.name}</span>
                <span>{detailContent?.createdAt.slice(0, 10)}</span>
              </div>
            </div>
            <div css={s.contentContainer}>{detailContent?.content}</div>
            {detailContent?.noticeImgs ? (
              detailContent?.noticeImgs?.map((img, index) => (
                <img key={index} src={img.imgUrl} alt="" />
              ))
            ) : (
              <></>
            )}
          </div>

          <div css={s.postLike}>
            <span>공감해요 {detailContent?.likeCount}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NoticeDetail;
