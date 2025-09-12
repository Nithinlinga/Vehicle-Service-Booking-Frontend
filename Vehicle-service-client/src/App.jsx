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

function App() {
  const { isAuthenticated, user,role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const storedUser = localStorage.getItem('auth');
      if (storedUser) {
        dispatch(login(JSON.parse(storedUser)));
      }
    }, []);
    console.log("user details",role)

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

        {/* Public-only pages (redirect if already logged in) */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-account" element={<LoginPage />} />
          <Route path="/admin-login" element={<Navigate to={"/login?role=Admin"}/>} />
          <Route path="/user-login" element={<Navigate to={"/login?role=User"}/>} />
          <Route path="/user-register" element={<Navigate to={"/register?role=User"}/>} />
          <Route path="/mechanic-login" element={<Navigate to={"/login?role=Mechanic"}/>} />
          <Route path="/mechanic-register" element={<Navigate to={"/register?role=Mechanic"}/>} />
        </Route>

        {/* Protected routes - must be authenticated */}
        <Route element={<ProtectedRoute />}>

          {/* Admin-only */}
          <Route element={<RoleRoute roles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Mechanic-only */}
          <Route element={<RoleRoute roles={['mechanic']} />}>
            <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          </Route>

          {/* Regular user-only */}
          <Route element={<RoleRoute roles={['user']} />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/appointment" element={<Appointments />}/>
            <Route path="/services" element={<Services />}/>
          </Route>
        </Route>

        {/* Fallbacks */}
        <Route path="/unauthorized" element={<UnauthorizedPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;