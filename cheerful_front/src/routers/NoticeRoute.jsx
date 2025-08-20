import React from "react";
import { Route, Routes } from "react-router-dom";
import Notice from "../pages/Notice/Notice/Notice";
import NoticeDetail from "../pages/Notice/NoticeDetail/NoticeDetail";

function NoticeRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Notice />} />
      <Route path="/:noticeId" element={<NoticeDetail />} />
    </Routes>
  );
}

export default NoticeRoute;
