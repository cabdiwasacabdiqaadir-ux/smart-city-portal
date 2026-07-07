import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/components/useAuth";
import { useEffect, useState } from "react";
import api from "@/api/api";

const DashboardHome = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get("/complaints/my");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);
  // calculate status counts
  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "PENDING"
  ).length;
  const inProgress = complaints.filter(
    (c) => c.status === "IN_PROGRESS"
  ).length;
  const resolved = complaints.filter(
    (c) => c.status === "RESOLVED"
  ).length;
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.fullName}
          </h1>

          <p className="text-muted-foreground">
            Manage your complaints and track their progress.
          </p>
        </div>

        <Link to="/citizen/complaints/new">
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Complaint
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              {pending}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {inProgress}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {resolved}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
        </CardHeader>

        <CardContent>
          {complaints.length === 0 ? (
            <p className="text-muted-foreground">
              No complaints found.
            </p>
          ) : (
            <div className="space-y-3">
              {complaints.slice(0, 10).map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{complaint.title}</span>

                  <span
                    className={
                      complaint.status === "PENDING"
                        ? "text-yellow-600"
                        : complaint.status === "IN_PROGRESS"
                        ? "text-blue-600"
                        : "text-green-600"
                    }
                  >
                    {complaint.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;