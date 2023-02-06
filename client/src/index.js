import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ViewProfile from "./pages/viewprofile/ViewProfile";
import ContextProvider from "./context/Context";
import "semantic-ui-css/semantic.min.css";
import Settings from "./pages/settings/Settings";
import EmailConfirm from "./pages/confirmemail/EmailConfirm";
import ForgotPass from "./pages/forgotpass/ForgotPass";

import ChangePass from "./pages/changepass/ChangePass";
import Layout from "./components/layout/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/viewprofile/:id" element={<ViewProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/changepassword/:token" element={<ChangePass />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
