import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DoctorsPage from "./pages/DoctorsPage.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.jsx";
import MyAppointmentsPage from "./pages/MyAppointmentsPage.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";

const App = () => {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/doctors" element={<DoctorsPage />} />

        <Route element={<PrivateRoute roles={["patient"]} />}>
          <Route path="/book/:doctorId" element={<BookAppointmentPage />} />
          <Route path="/appointments" element={<MyAppointmentsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
