import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building2,
  Tags,
  ClipboardList,
  User,
  LogOut,
  Menu,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/components/useAuth";

const navItems = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    path: "/admin/officers",
    label: "Officers",
    icon: Users,
  },

  {
    path: "/admin/departments",
    label: "Departments",
    icon: Building2,
  },

  {
    path: "/admin/categories",
    label: "Categories",
    icon: Tags,
  },

  {
    path: "/admin/complaints",
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
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <p className="text-sm text-muted-foreground mt-2">{user?.fullName}</p>

        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>

      <Separator className="mb-4" />

      {/* Menu */}

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.path;

          return (
            <Link key={item.path} to={item.path} onClick={onClose}>
              <Button
                variant={active ? "default" : "ghost"}
                className="
                w-full
                justify-start
                h-11
                "
              >
                <Icon className="mr-3 h-5 w-5" />

                {item.label}
              </Button>
            </Link>
          );
        })}

        <Link to="/admin/profile" onClick={onClose}>
          <Button
            variant={pathname === "/admin/profile" ? "default" : "ghost"}
            className="
          w-full
          justify-start
          h-11
          "
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      <Button
        variant="destructive"
        className="w-full h-11"
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </Button>
    </div>
  );
}

const AdminSidebar = () => {
  const { user } = useAuth();

  const location = useLocation();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}

      <div
        className="
      md:hidden
      fixed
      top-4
      left-4
      z-50
      "
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="
            rounded-full
            shadow-md
            "
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="
          w-72
          p-5
          "
          >
            <SidebarContent
              user={user}
              pathname={location.pathname}
              onClose={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}

      <aside
        className="
      hidden
      md:flex
      w-72
      h-screen
      border-r
      bg-background
      p-5
      flex-col
      "
      >
        <SidebarContent user={user} pathname={location.pathname} />
      </aside>
    </>
  );
};

export default AdminSidebar;
