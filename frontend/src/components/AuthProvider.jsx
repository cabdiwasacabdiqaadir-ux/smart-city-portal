import { useEffect, useState } from "react";
import api from "@/api/api";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      setUser(null);
      console.error("Error loading profile:", err);
      toast.error("Failed to load profile!");
    }
  };
    useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadProfile();
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out!");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loadProfile,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

