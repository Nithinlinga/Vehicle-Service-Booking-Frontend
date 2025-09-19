import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/user/pages/Login";
import Register from "./components/user/pages/Register";
import LoginPage from "./components/LoginPage";
import { WelcomeUser } from "./components/WelcomeUser";
import AdminDashboard from "./components/admin/AdminDashboard";
import MechanicDashboard from "./components/mechanic/MechanicDashboard";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import RoleRoute from "./components/routes/RoleRoute";
import PublicOnlyRoute from "./components/routes/PublicOnlyRoute";
import { login } from "./store/authSlice";
import { useEffect } from "react";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Footer from './components/footer/Footer';
import Services from './components/user/pages/Services';
import Appointments from './components/user/pages/Appointments';
import ManageServiceCentre from "./components/admin/pages/ManageServiceCentre";
import AdminHome from "./components/admin/pages/AdminHome";
import ManageAppointment from "./components/admin/pages/ManageAppointment";
import AdminProfile from "./components/admin/pages/AdminProfile";
import Vehicles from './components/user/pages/Vehicles';
import AddServiceCentre from "./components/admin/pages/AddServiceCentre";
import ManageUsers from "./components/admin/pages/ManageUsers";
import ManageMechanics from "./components/admin/pages/ManageMechanics";
import ViewAppointments from "./components/user/pages/ViewAppointments";
import Invoice from "./components/user/pages/Invoice";
import MechanicProfile from "./components/mechanic/pages/MechanicProfile";
import Servicelog from "./components/mechanic/pages/Servicelog";
import Earnings from "./components/mechanic/pages/Earnings";
import EditProfile from "./components/mechanic/pages/EditProfile";
import EditSkills from "./components/mechanic/pages/EditSkills";
import UserLayout from "./components/user/UserLayout";
import UserDashboard from "./components/user/pages/UserDashboard";
import UserProfile from "./components/user/pages/UserProfile";
import MechanicLayout from "./components/mechanic/MechanicLayout";
import UserEditProfile from "./components/user/pages/UserEditProfile";
import AdminEditProfile from "./components/admin/pages/AdminEditProfile";


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
              <Route path="edit-profile" element={<AdminEditProfile />} />
            </Route>
          </Route>

          {/* Mechanic-only */}
          <Route element={<RoleRoute roles={['mechanic']} />}>
            <Route path="/mechanic" element={<MechanicLayout />} >
            <Route index element={<MechanicDashboard />} />
            <Route path="earnings"element={<Earnings/>}/>
            <Route path="profile" element={<MechanicProfile />} />
            <Route path="service-history" element={<Servicelog />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="edit-skills" element={<EditSkills />} />
            </Route>
          </Route>

          {/* User-only */}
          <Route element={<RoleRoute roles={['user']} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="viewappointment" element={<ViewAppointments />} />
            <Route path="appointment" element={<Appointments />} />
            <Route path="services" element={<Services />} />
            <Route path="vehicles" element={<Vehicles />}/>
            <Route path="invoice" element={<Invoice />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="edit-profile" element={<UserEditProfile />} />
          </Route>
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