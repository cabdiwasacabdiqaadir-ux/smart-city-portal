import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  User,
  Menu,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  {
    path: "/citizen",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/citizen/complaints/new",
    label: "Add Complaint",
    icon: PlusCircle,
  },
  {
    path: "/citizen/complaints",
    label: "My Complaints",
    icon: FileText,
  },
];

function SidebarContent({
  user,
  currentPath,
  onCloseMobile,
  onLogout,
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Citizen Panel</h2>

        <p className="text-xs text-muted-foreground">
          Welcome, {user?.fullName}
        </p>

        <p className="text-xs text-muted-foreground">
          {user?.email}
        </p>
      </div>

      <Separator className="mb-4" />

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
            >
              <Button
                variant={
                  currentPath === item.path
                    ? "default"
                    : "ghost"
                }
                className="w-full justify-start gap-2"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <Separator className="my-4" />

        <Link
          to="/citizen/profile"
          onClick={onCloseMobile}
        >
          <Button
            variant={
              currentPath === "/citizen/profile"
                ? "default"
                : "ghost"
            }
            className="w-full justify-start gap-2 mb-2"
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
        </Link>

        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
export default function CitizenSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-4">
            <SidebarContent
              user={user}
              currentPath={location.pathname}
              onCloseMobile={() => setOpen(false)}
              onLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen border-r bg-background p-4 flex-col">
        <SidebarContent
          user={user}
          currentPath={location.pathname}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}