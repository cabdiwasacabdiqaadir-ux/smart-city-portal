import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import CitizenDashboard from "./pages/dashboard/citizen/Dashboard";
import DashboardHome from "./pages/dashboard/citizen/DashboardHome";
import AddComplaint from "./pages/dashboard/citizen/AddComplaint";
import MyComplaints from "./pages/dashboard/citizen/MyComplaints";
import Profile from "./pages/dashboard/citizen/Profile";
import OfficerDashboardHome from "./pages/dashboard/officer/OfficerDashboardHome";
import OficerComplaint from "./pages/dashboard/officer/OficerComplaint";
import OfficerDashboard from "./pages/dashboard/officer/Dashboard";
import OfficerProfile from "./pages/dashboard/officer/profile";
import AdminDashboard from "./pages/dashboard/admin/Dashboard";
import AdminDashboardHome from "./pages/dashboard/admin/AdminDashboardHome";
import Officers from "./pages/dashboard/admin/Officers";
import Departments from "./pages/dashboard/admin/Departments";
import Categories from "./pages/dashboard/admin/Categories";
import Complaints from "./pages/dashboard/admin/Complaints";
function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/citizen/*"
          element={
            <ProtectedRoute>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="complaints/new" element={<AddComplaint />} />
          <Route path="complaints" element={<MyComplaints />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/officer/*"
          element={
            <ProtectedRoute>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<OfficerDashboardHome />} />
          <Route path="complaints" element={<OficerComplaint />} />
          <Route path="profile" element={<OfficerProfile />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="officers" element={<Officers />} />
          <Route path="departments" element={<Departments />} />
          <Route path="categories" element={<Categories />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="profile" element={<Profile />} />
        </Route>  
      </Routes>
    </div>
  );
}

export default App;
