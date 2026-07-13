import {
  ClipboardList,
  Building2,
  MapPinned,
  ShieldCheck,
  BellRing,
  BarChart3,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ClipboardList,
    title: "Easy Complaint Submission",
    description:
      "Submit complaints about roads, utilities, sanitation, and other public services in just a few clicks.",
  },
  {
    icon: Building2,
    title: "Automatic Department Assignment",
    description:
      "Complaints are automatically routed to the responsible government department.",
  },
  {
    icon: BellRing,
    title: "Status Tracking",
    description:
      "Track your complaint from submission until it is resolved with real-time status updates.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Your account and complaints are protected with secure JWT authentication and role-based access.",
  },
  {
    icon: MapPinned,
    title: "Location Based Reports",
    description:
      "Provide the exact location of the issue to help departments respond faster.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Administrators can monitor complaints, priorities, and city service performance through dashboards.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl font-bold">Powerful Features</h2>

          <p className="mt-4 text-slate-600">
            Our Smart City Portal makes it simple for citizens to report issues
            while helping city departments manage complaints efficiently.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
