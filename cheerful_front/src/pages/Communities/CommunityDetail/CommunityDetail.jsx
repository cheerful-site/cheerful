/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect } from "react";
import { reqCommunityDetail } from "../../../api/communityApi/communityApi";
import useCommunityDetailQuery from "../../../queries/CommunityQuery/useCommunityDetail";

function CommunityDetail(props) {
  const params = useParams();
  const communityDetail = useCommunityDetailQuery(params.communityId);

  console.log(communityDetail?.data);

  useEffect(() => {}, []);

  return <div>detail</div>;
}

export default CommunityDetail;
