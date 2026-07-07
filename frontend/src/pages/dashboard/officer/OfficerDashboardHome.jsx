import { useEffect, useState } from "react";
import api from "@/api/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/useAuth";
export default function OfficerDashboardHome() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get("/complaints/officer");
        setComplaints(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaints();
  }, []);

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
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.fullName}
        </h1>

        <p className="text-muted-foreground">
          Manage assigned complaints and update their status.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Complaints</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <p className="text-3xl font-bold">{total}</p>

            <ClipboardList className="w-8 h-8 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <p className="text-3xl font-bold text-yellow-600">
              {pending}
            </p>

            <Clock className="w-8 h-8 text-yellow-600" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <p className="text-3xl font-bold text-blue-600">
              {inProgress}
            </p>

            <Clock className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <p className="text-3xl font-bold text-green-600">
              {resolved}
            </p>

            <CheckCircle className="w-8 h-8 text-green-600" />
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
              No complaints available.
            </p>
          ) : (
            <div className="space-y-3">
              {complaints.slice(0, 5).map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex justify-between items-center border rounded-lg p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {complaint.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {complaint.categoryName}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      complaint.status === "PENDING"
                        ? "text-yellow-600"
                        : complaint.status === "IN_PROGRESS"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
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
}