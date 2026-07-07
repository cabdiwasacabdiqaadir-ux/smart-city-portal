import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

const profileSchema = z.object({
  fullName: z.string().trim().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().optional(),
});

const OfficerProfile = () => {
  const [profile, setProfile] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      fullName: "",

      email: "",

      password: "",
    },
  });

  // GET PROFILE

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/profile");

        setProfile(response.data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  // OPEN EDIT

  const handleEdit = () => {
    reset({
      fullName: profile.fullName,

      email: profile.email,

      password: "",
    });

    setEditMode(true);
  };

  // UPDATE PROFILE

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        fullName: data.fullName,

        email: data.email,
      };

      // only send password if user writes one

      if (data.password) {
        payload.password = data.password;
      }

      const response = await api.put("/profile", payload);

      setProfile(response.data);

      toast.success("Profile updated successfully");

      setEditMode(false);
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        min-h-screen
      "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      p-4
      bg-muted/20
    "
    >
      <Card
        className="
        w-full
        max-w-3xl
        shadow-xl
      "
      >
        <CardHeader
          className="
          text-center
          space-y-4
        "
        >
          <div
            className="
            mx-auto
            w-28
            h-28
            rounded-full
            bg-primary
            text-primary-foreground
            flex
            items-center
            justify-center
            text-4xl
            font-bold
          "
          >
            {profile.fullName?.charAt(0)}
          </div>

          <div>
            <CardTitle className="text-3xl">{profile.fullName}</CardTitle>

            <p className="text-muted-foreground">Officer</p>
          </div>
        </CardHeader>

        <CardContent>
          {!editMode ? (
            <div className="space-y-6">
              <div
                className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
              >
                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground">Full Name</p>

                  <p className="text-lg font-semibold">{profile.fullName}</p>
                </div>

                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground">Email</p>

                  <p
                    className="
                  text-lg
                  font-semibold
                  break-all
                "
                  >
                    {profile.email}
                  </p>
                </div>

                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground">Role</p>

                  <p className="text-lg font-semibold">{profile.role}</p>
                </div>

                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground">Department</p>

                  <p className="text-lg font-semibold">
                    {profile.department
                      ? profile.department.name
                      : "No Department"}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleEdit}
                className="
                w-full
                h-12
                text-lg
              "
              >
                Update Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label>Full Name</Label>

                <Input className="h-12" {...register("fullName")} />

                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>

                <Input className="h-12" {...register("email")} />

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>New Password</Label>

                <Input
                  className="h-12"
                  type="password"
                  placeholder="Optional"
                  {...register("password")}
                />
              </div>

              <div
                className="
              flex
              flex-col
              sm:flex-row
              gap-3
            "
              >
                <Button
                  type="submit"
                  className="h-12 flex-1"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-12 flex-1"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerProfile;
