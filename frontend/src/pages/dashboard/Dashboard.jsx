import { useAuth } from "@/components/useAuth";
import CitizenDashboard from "./citizen/Dashboard";
import AdminDashboard from "./admin/Dashboard";
import OfficerDashboard from "./officer/Dashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const role = user?.role;

  if (role === "CITIZEN") return <CitizenDashboard />;
  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "OFFICER") return <OfficerDashboard />;

  return (
    <div className="flex items-center justify-center h-screen">
      Unknown role
    </div>
  );
}