import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DoctorsPage from "./pages/DoctorsPage.jsx";
import DoctorDetailPage from "./pages/DoctorDetailPage.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.jsx";
import MyAppointmentsPage from "./pages/MyAppointmentsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DoctorAppointmentsPage from "./pages/DoctorAppointmentsPage.jsx";
import DoctorProfilePage from "./pages/DoctorProfilePage.jsx";

import PrivateRoute from "./router/PrivateRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import AdminDoctorsPage from "./pages/AdminDoctorsPage.jsx";
import AdminProfilePage from "./pages/AdminProfilePage.jsx";

const App = () => {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorDetailPage />} />

        <Route element={<PrivateRoute roles={["user"]} />}>
          <Route path="/book/:doctorId" element={<BookAppointmentPage />} />
          <Route path="/appointments" element={<MyAppointmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<PrivateRoute roles={["doctor"]} />}>
          <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
          <Route path="/doctor/profile" element={<DoctorProfilePage />} />
        </Route>
        <Route element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
