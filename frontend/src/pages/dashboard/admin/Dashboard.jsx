import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <main
        className="
        flex-1
        p-4
        md:p-6
        overflow-auto
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
