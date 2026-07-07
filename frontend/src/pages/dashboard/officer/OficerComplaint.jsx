import { useEffect, useState } from "react";

import api from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

const OfficerComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  // Load complaints
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const response = await api.get("/complaints/officer");
        setComplaints(response.data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);
  // Change status
  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/complaints/${id}/status`, null, {
        params: {
          status: status,
        },
      });
      toast.success("Status updated");
      // reload data
      const response = await api.get("/complaints/officer");
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600";

      case "IN_PROGRESS":
        return "text-blue-600";

      case "RESOLVED":
        return "text-green-600";

      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">Loading complaints...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assigned Complaints</h1>

        <p className="text-muted-foreground">Manage citizen complaints</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaints</CardTitle>
        </CardHeader>

        <CardContent>
          {complaints.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No complaints found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">Title</th>

                    <th className="p-3 text-left">Location</th>

                    <th className="p-3 text-left">Priority</th>

                    <th className="p-3 text-left">Status</th>

                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b">
                      <td className="p-3">{complaint.title}</td>

                      <td className="p-3">{complaint.location}</td>

                      <td className="p-3">{complaint.priority}</td>

                      <td
                        className={`p-3 font-semibold ${statusStyle(
                          complaint.status,
                        )}`}
                      >
                        {complaint.status}
                      </td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          {complaint.status === "PENDING" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                changeStatus(complaint.id, "IN_PROGRESS")
                              }
                            >
                              Start
                            </Button>
                          )}

                          {complaint.status === "IN_PROGRESS" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                changeStatus(complaint.id, "RESOLVED")
                              }
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerComplaint;
