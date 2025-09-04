import React from "react";
import { Route, Routes } from "react-router-dom";
import Community from "../pages/Communities/Community/Community";
import CommunityDetail from "../pages/Communities/CommunityDetail/CommunityDetail";
import NotFound from "../pages/NotFound/NotFound";

function CommunityRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Community />} />
      <Route path="/:communityId" element={<CommunityDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default CommunityRoute;
