import { useEffect, useState } from "react";
import { Users, ClipboardList, CheckCircle2, Building2 } from "lucide-react";

import api from "@/api/api";

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDepartments: 0,
    totalComplaints: 0,
    resolvedComplaints: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/dashboard");

        setStats({
          totalUsers: data.totalUsers,
          totalDepartments: data.totalDepartments,
          totalComplaints: data.totalComplaints,
          resolvedComplaints: data.resolvedComplaints,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, []);

  const items = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
    },
    {
      title: "Complaints",
      value: stats.totalComplaints,
      icon: ClipboardList,
    },
    {
      title: "Resolved",
      value: stats.resolvedComplaints,
      icon: CheckCircle2,
    },
    {
      title: "Departments",
      value: stats.totalDepartments,
      icon: Building2,
    },
  ];

  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Smart City by the Numbers</h2>

          <p className="mt-4 text-blue-100">
            Live statistics from the Smart City Complaint Portal.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur transition hover:bg-white/20"
              >
                <Icon className="mx-auto mb-5 h-12 w-12" />

                <h3 className="text-4xl font-bold">{item.value}</h3>

                <p className="mt-2 text-blue-100">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
