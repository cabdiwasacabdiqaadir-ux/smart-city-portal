import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/useAuth";

const navItems = [
  {
    path: "/officer",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/officer/complaints",
    label: "Complaints",
    icon: ClipboardList,
  },
];

function SidebarContent({ user, pathname, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">Officer Panel</h2>

        <p className="text-sm text-muted-foreground mt-2">
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
              onClick={onClose}
            >
              <Button
                variant={
                  pathname === item.path
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

        <Link
          to="/officer/profile"
          onClick={onClose}
        >
          <Button
            variant={
              pathname === "/officer/profile"
                ? "default"
                : "ghost"
            }
            className="w-full justify-start gap-2"
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-auto">
        <Separator className="my-4" />

        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
export default function OfficerSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden fixed left-0 top-20 -translate-y-1/2 z-50">
  <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild>
      <Button
        variant="secondary"
        className="rounded-r-full rounded-l-none h-16 w-8 shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </SheetTrigger>

    <SheetContent side="left" className="w-64 p-4">
      <SidebarContent
        user={user}
        pathname={location.pathname}
        onClose={() => setOpen(false)}
      />
    </SheetContent>
  </Sheet>
</div>
      {/* Desktop */}
      <aside className="hidden md:flex w-64 h-screen border-r bg-background p-4 flex-col">
        <SidebarContent
          user={user}
          pathname={location.pathname}
        />
      </aside>
    </>
  );
}