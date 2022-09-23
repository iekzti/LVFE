import "../src/style.scss";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardUser from "./pages/Dashboard/DashboardUser";
import Redesign from "./pages/Redesign/Redesign";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import Profile from "./pages/Profile/Profile";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import HistoryAdmin from "./pages/Admin/HistoryAdmin";
import ProcessInfo from "./pages/Process/ProcessInfo";


function App() {
  return (
    <Router>
      <div className="bg-light">
          <Routes>
            <Route path="/home" exact element={<Home />}></Route>
            <Route path="/dashboard" exact element={<Dashboard />}></Route>
            <Route path="/dashboardUser" exact element={<DashboardUser />}></Route>
            <Route path="/redesign" exact element={<Redesign />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/signup" exact element={<SignUp />}></Route>
            <Route path="/profile" exact element={<Profile />}></Route>
            <Route path="/dashboardAdmin" exact element={<DashboardAdmin />}></Route>
            <Route path="/historyAdmin" exact element={<HistoryAdmin />}></Route>
            <Route path="/processInfo" exact element={<ProcessInfo />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
