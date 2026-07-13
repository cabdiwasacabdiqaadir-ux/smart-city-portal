import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "./useAuth";
const Navigation = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "OFFICER") return "/officer";
    return "/citizen";
  };

  return (
     <div className="sticky top-0 z-50 border-b px-6 py-3 flex items-center justify-between bg-background text-foreground">
      <Link to="/" className="font-bold text-xl">
        Smart City
      </Link>
      {/* DESKTOP */}
      <div className="hidden md:flex items-center gap-6">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <Link to="/"><Button variant="ghost">Home</Button></Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about"><Button variant="ghost">About</Button></Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact"><Button variant="ghost">Contact</Button></Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
            >
              {user.fullName?.charAt(0).toUpperCase()}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-background border rounded-lg shadow-lg z-50">
                <div className="p-3 border-b">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-accent"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-accent"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
            {open && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
      {/* MOBILE */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="p-2 cursor-pointer hover:bg-accent rounded-md">
              <Menu className="w-5 h-5" />
            </div>
          </SheetTrigger>
          <SheetContent side="top" className="flex flex-col gap-5">
            <Link to="/"><Button variant="ghost" className="w-full justify-start">Home</Button></Link>
            <Link to="/about"><Button variant="ghost" className="w-full justify-start">About</Button></Link>
            <Link to="/contact"><Button variant="ghost" className="w-full justify-start">Contact</Button></Link>
            <ModeToggle />
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="border rounded-lg p-4 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-semibold mt-2">{user.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <Link to={getDashboardLink()}>
                  <Button variant="outline" className="w-full">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navigation;