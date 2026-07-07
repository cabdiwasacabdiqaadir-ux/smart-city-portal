import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

// Validation Schema
const complaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  location: z.string().trim().min(1, "Location is required"),

  categoryId: z.string().min(1, "Category is required"),

  priority: z.string().min(1, "Priority is required"),
});

export default function AddComplaint() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [categoryLoading, setCategoryLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(complaintSchema),

    defaultValues: {
      title: "",
      description: "",
      location: "",
      categoryId: "",
      priority: "",
    },

    mode: "onBlur",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load categories");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        title: data.title,

        description: data.description,

        location: data.location,

        categoryId: Number(data.categoryId),

        priority: data.priority,
      };

      await api.post(
        "/complaints",
        payload
      );

      toast.success("Complaint submitted successfully");

      reset();

      navigate("/citizen/complaints");
    } catch (error) {
      console.log("Submit error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to submit complaint",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Complaint</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* TITLE */}

            <div className="space-y-1">
              <Label>Title</Label>

              <Input
                placeholder="Example: Large potholes on road"
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="space-y-1">
              <Label>Description</Label>

              <Textarea
                rows={5}
                placeholder="Describe the problem"
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* LOCATION */}

            <div className="space-y-1">
              <Label>Location</Label>

              <Input
                placeholder="Example: Hodan district"
                {...register("location")}
              />

              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}

            <div className="space-y-1">
              <Label>Category</Label>

              <select
                className="
                w-full h-10
                border rounded-md
                px-3 bg-background
                "
                disabled={categoryLoading}
                {...register("categoryId")}
              >
                <option value="">
                  {categoryLoading
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* PRIORITY */}

            <div className="space-y-1">
              <Label>Priority</Label>

              <select
                className="
                w-full h-10
                border rounded-md
                px-3 bg-background
                "
                {...register("priority")}
              >
                <option value="">Select priority</option>

                <option value="LOW">Low</option>

                <option value="MEDIUM">Medium</option>

                <option value="HIGH">High</option>
              </select>

              {errors.priority && (
                <p className="text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Complaint"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
