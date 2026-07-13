import { useEffect, useState } from "react";

import api from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Trash2, Pencil, UserPlus } from "lucide-react";

import { toast } from "sonner";

const Officers = () => {
  const [officers, setOfficers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",

    email: "",

    password: "",

    departmentName: "",
  });

  // LOAD OFFICERS

  useEffect(() => {
    let active = true;

    const fetchOfficers = async () => {
      try {
        const response = await api.get("/users");

        const data = response.data.filter((user) => user.role === "OFFICER");

        if (active) {
          setOfficers(data);
        }
      } catch (error) {
        console.log(error);

        if (active) {
          toast.error("Failed to load officers");
        }
      }
    };

    fetchOfficers();

    return () => {
      active = false;
    };
  }, []);

  // REFRESH

  const refreshOfficers = async () => {
    try {
      const response = await api.get("/users");

      setOfficers(response.data.filter((user) => user.role === "OFFICER"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE

  const createOfficer = async () => {
    try {
      setLoading(true);

      await api.post("/users", {
        fullName: form.fullName,

        email: form.email,

        password: form.password,

        role: "OFFICER",

        departmentName: form.departmentName,
      });

      toast.success("Officer created successfully");

      clearForm();

      await refreshOfficers();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  // EDIT

  const editOfficer = (officer) => {
    setEditingId(officer.id);

    setForm({
      fullName: officer.fullName,

      email: officer.email,

      password: "",

      departmentName: officer.department?.name || "",
    });
  };

  // UPDATE

  const updateOfficer = async () => {
    try {
      setLoading(true);

      await api.put(
        `/users/${editingId}`,

        {
          fullName: form.fullName,

          email: form.email,

          role: "OFFICER",

          departmentName: form.departmentName,

          ...(form.password && {
            password: form.password,
          }),
        },
      );

      toast.success("Officer updated successfully");

      clearForm();

      await refreshOfficers();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE

  const deleteOfficer = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("Officer deleted");
      await refreshOfficers();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const clearForm = () => {
    setEditingId(null);

    setForm({
      fullName: "",

      email: "",

      password: "",

      departmentName: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Officers Management</h1>

        <p className="text-muted-foreground">Create and manage officers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <UserPlus className="h-5 w-5" />

            {editingId ? "Update Officer" : "Create Officer"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            placeholder="Department Name"
            name="departmentName"
            value={form.departmentName}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={loading}
              onClick={editingId ? updateOfficer : createOfficer}
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Officer"
                  : "Create Officer"}
            </Button>

            {editingId && (
              <Button variant="outline" onClick={clearForm}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Officers</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {officers.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No officers found
              </p>
            ) : (
              officers.map((officer) => (
                <div
                  key={officer.id}
                  className="
                border
                rounded-xl
                p-4
                flex
                justify-between
                items-center
                "
                >
                  <div>
                    <h3 className="font-semibold">{officer.fullName}</h3>

                    <p className="text-sm text-muted-foreground">
                      {officer.email}
                    </p>

                    <p className="text-sm">
                      Department: {officer.department?.name || "No department"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => editOfficer(officer)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteOfficer(officer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Officers;
