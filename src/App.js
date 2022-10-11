import BusinessProcessDiagram from "pages/Dashboard/BusinessProcessDiagram";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "../src/style.scss";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import HistoryAdmin from "./pages/Admin/HistoryAdmin";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardUser from "./pages/Dashboard/DashboardUser";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import ProcessInfo from "./pages/Process/ProcessInfo";
import Profile from "./pages/Profile/Profile";
import Redesign from "./pages/Redesign/Redesign";

function App() {
  return (
    <Router>
      <div className="bg-light">
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/dashboardUser" exact element={<DashboardUser />} />
          <Route
            path="/business-process-diagram"
            exact
            element={<BusinessProcessDiagram />}
          />
          <Route path="/redesign" exact element={<Redesign />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/dashboardAdmin" exact element={<DashboardAdmin />} />
          <Route path="/historyAdmin" exact element={<HistoryAdmin />} />
          <Route path="/processInfo" exact element={<ProcessInfo />} />
          <Route path="/" element={<Navigate to="/dashboardUser" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
