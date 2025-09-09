import React from "react";
import { Route, Routes } from "react-router-dom";
import Notice from "../pages/Notice/Notice/Notice";
import NoticeDetail from "../pages/Notice/NoticeDetail/NoticeDetail";
import NotFound from "../pages/NotFound/NotFound";

function NoticeRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Notice />} />
      <Route path="/:noticeId" element={<NoticeDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NoticeRoute;
