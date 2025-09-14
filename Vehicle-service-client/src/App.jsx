import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import LoginPage from "./components/LoginPage";
import { WelcomeUser } from "./components/WelcomeUser";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import MechanicDashboard from "./components/mechanic/MechanicDashboard";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import RoleRoute from "./components/routes/RoleRoute";
import PublicOnlyRoute from "./components/routes/PublicOnlyRoute";
import { login } from "./store/authSlice";
import { useEffect } from "react";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Footer from './components/footer/Footer';
import Services from './components/user/Services';
import Appointments from './components/user/Appointments';
import ManageServiceCentre from "./components/admin/pages/ManageServiceCentre";
import AdminHome from "./components/admin/pages/AdminHome";
import ManageAppointment from "./components/admin/pages/ManageAppointment";
import AdminProfile from "./components/admin/pages/AdminProfile";
import Vehicles from './components/user/Vehicles';
import AddServiceCentre from "./components/admin/pages/AddServiceCentre";
import ManageUsers from "./components/admin/pages/ManageUsers";
import ManageMechanics from "./components/admin/pages/ManageMechanics";
import ViewAppointments from "./components/user/ViewAppointments";
import Invoice from "./components/user/Invoice";
import Earnings from "./components/mechanic/pagesmec/Earnings";
import Profile from "./components/mechanic/pagesmec/Profile";
import Servicelog from "./components/mechanic/pagesmec/Servicelog";

function App() {
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, []);
  console.log("user details", role)

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/welcome" element={<WelcomeUser />} />
        <Route path="/admin-dashboard" element={<Navigate to={"/admin"} />} />

        {/* Public-only pages (redirect if already logged in) */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-account" element={<LoginPage />} />
          <Route path="/admin-login" element={<Navigate to={"/login?role=Admin"} />} />
          <Route path="/user-login" element={<Navigate to={"/login?role=User"} />} />
          <Route path="/user-register" element={<Navigate to={"/register?role=User"} />} />
          <Route path="/mechanic-login" element={<Navigate to={"/login?role=Mechanic"} />} />
          <Route path="/mechanic-register" element={<Navigate to={"/register?role=Mechanic"} />} />
        </Route>

        {/* Protected routes - must be authenticated */}
        <Route element={<ProtectedRoute />}>
          {/* Admin-only */}
          <Route element={<RoleRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} /> {/* Default dashboard content */}
              <Route path="manage-appointment" element={<ManageAppointment />} />
              <Route path="manage-service-centers" element={<ManageServiceCentre />} />
              <Route path="add-service-centers" element={<AddServiceCentre />} />
              <Route path="add-service-centers/:id" element={<AddServiceCentre />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-mechanics" element={<ManageMechanics />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          {/* Mechanic-only */}
          <Route element={<RoleRoute roles={['mechanic']} />}>
            <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
            <Route path="/earnings"element={<Earnings/>}/>
            <Route path="/profile"element={<Profile/>}/>
            <Route path="/services"element={<Servicelog/>}/>
          </Route>

          {/* User-only */}
          <Route element={<RoleRoute roles={['user']} />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/viewappointment" element={<ViewAppointments />} />
            <Route path="/appointment" element={<Appointments />} />
            <Route path="/userservices" element={<Services />} />
            <Route path="/vehicles" element={<Vehicles />}/>
            <Route path="/invoice" element={<Invoice />} />
          </Route>
        </Route>


        {/* Fallbacks */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;