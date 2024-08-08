import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import BaseLayout from "../components/BaseLayout";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route
          path="/main"
          element={
            <BaseLayout>
              <MainPage />
            </BaseLayout>
          }
        />
        <Route
          path="/my"
          element={
            <BaseLayout>
              <MyPage />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
