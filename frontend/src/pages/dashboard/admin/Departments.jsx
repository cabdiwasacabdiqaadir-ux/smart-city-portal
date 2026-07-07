import { useEffect, useState } from "react";

import api from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2, Building2 } from "lucide-react";

import { toast } from "sonner";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
  });

  // LOAD DEPARTMENTS

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await api.get("/departments");

        setDepartments(response.data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load departments");
      }
    };

    loadDepartments();
  }, []);

  const refreshDepartments = async () => {
    const response = await api.get("/departments");

    setDepartments(response.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE / UPDATE

  const saveDepartment = async () => {
    try {
      setLoading(true);

      if (editingId) {
        await api.put(
          `/departments/${editingId}`,

          {
            name: form.name,
          },
        );

        toast.success("Department updated");
      } else {
        await api.post(
          "/departments",

          {
            name: form.name,
          },
        );

        toast.success("Department created");
      }

      clearForm();

      refreshDepartments();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // EDIT

  const editDepartment = (department) => {
    setEditingId(department.id);

    setForm({
      name: department.name,
    });
  };

  // DELETE

  const deleteDepartment = async (id) => {
    try {
      await api.delete(`/departments/${id}`);

      toast.success("Department deleted");

      refreshDepartments();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const clearForm = () => {
    setEditingId(null);

    setForm({
      name: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Departments</h1>

        <p className="text-muted-foreground">Manage system departments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />

            {editingId ? "Update Department" : "Create Department"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Department name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={loading}
              onClick={saveDepartment}
            >
              {loading ? "Saving..." : editingId ? "Update" : "Create"}
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
          <CardTitle>All Departments</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {departments.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No departments found
              </p>
            ) : (
              departments.map((department) => (
                <div
                  key={department.id}
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
                    <h3 className="font-semibold">{department.name}</h3>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => editDepartment(department)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteDepartment(department.id)}
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

export default Departments;
