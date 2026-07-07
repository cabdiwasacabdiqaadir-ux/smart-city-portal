import { useEffect, useState } from "react";
import api from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2, Tag } from "lucide-react";

import { toast } from "sonner";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    departmentId: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesResponse = await api.get("/categories");

        const departmentsResponse = await api.get("/departments");

        setCategories(categoriesResponse.data);

        setDepartments(departmentsResponse.data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load data");
      }
    };

    loadData();
  }, []);

  const loadCategories = async () => {
    const response = await api.get("/categories");

    setCategories(response.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const saveCategory = async () => {
    try {
      setLoading(true);

      const data = {
        name: form.name,

        departmentId: Number(form.departmentId),
      };

      if (editingId) {
        await api.put(`/categories/${editingId}`, data);

        toast.success("Category updated");
      } else {
        await api.post("/categories", data);

        toast.success("Category created");
      }

      clearForm();

      loadCategories();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const editCategory = (category) => {
    setEditingId(category.id);

    setForm({
      name: category.name,

      departmentId: category.departmentId,
    });
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);

      toast.success("Category deleted");

      loadCategories();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const clearForm = () => {
    setEditingId(null);

    setForm({
      name: "",

      departmentId: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>

        <p className="text-muted-foreground">Manage complaint categories</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <Tag className="h-5 w-5" />

            {editingId ? "Update Category" : "Create Category"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Category name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <select
            className="
            w-full
            border
            rounded-md
            p-3
            "
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={loading}
              onClick={saveCategory}
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
          <CardTitle>All Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No categories found
              </p>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
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
                    <h3 className="font-semibold">{category.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      Department: {category.departmentName}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => editCategory(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteCategory(category.id)}
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

export default Categories;
