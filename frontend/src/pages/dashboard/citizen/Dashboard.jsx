import CitizenSidebar from "@/components/dashboard/CitizenSidebar";
import { Outlet } from "react-router-dom";

export default function CitizenLayout() {
  return (
    <div className="flex h-screen overflow-hidden ">
      {/* SIDEBAR */}
      <CitizenSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 bg-background ">
        <Outlet />
      </main>
    </div>
  );
}