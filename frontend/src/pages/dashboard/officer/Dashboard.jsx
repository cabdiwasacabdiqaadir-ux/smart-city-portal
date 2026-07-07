import OfficerSidebar from "@/components/dashboard/OfficerSidebar";
import { Outlet } from "react-router-dom";

const OfficerDashboard = () => {
   return (
    <div className="flex min-h-screen bg-muted/20">
      <OfficerSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default OfficerDashboard