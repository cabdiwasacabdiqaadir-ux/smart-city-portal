import { useEffect, useState } from "react";
import api from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get("/complaints/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center p-10">Loading complaints...</div>
    );
  }
  const formatDate = (date) => {
  if (!date) return "Unknown date";

  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Complaints</h1>
        <p className="text-muted-foreground">Track your submitted complaints</p>
      </div>
      {complaints.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            No complaints found
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {complaints.map((complaint) => (
            <Card key={complaint.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{complaint.title}</CardTitle>

                  <Badge>{complaint.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {complaint.description}
                </p>
                <p>
                  <strong>Location:</strong> {complaint.location}
                </p>
                <p>
                  <strong>Priority:</strong> {complaint.priority}
                </p>
                <p>
                  <strong>Category:</strong> {complaint.categoryName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(complaint.createdAt)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
