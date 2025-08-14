import React from "react";
import { Route, Routes } from "react-router-dom";
import Community from "../pages/Communities/Community/Community";
import CommunityDetail from "../pages/Communities/CommunityDetail/CommunityDetail";

function CommunityRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Community />} />
      <Route path="/:communityId" element={<CommunityDetail />} />
    </Routes>
  );
}

export default CommunityRoute;
