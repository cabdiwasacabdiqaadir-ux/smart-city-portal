import {
  ShieldCheck,
  Clock3,
  Building2,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Your account and complaint information are protected with secure authentication and role-based access.",
  },
  {
    icon: Clock3,
    title: "Fast Response",
    description:
      "Complaints are instantly assigned to the appropriate department, reducing response time.",
  },
  {
    icon: Building2,
    title: "Efficient Management",
    description:
      "City departments can organize, prioritize, and monitor complaints from a centralized dashboard.",
  },
  {
    icon: Users,
    title: "Citizen-Centered",
    description:
      "Residents can easily submit complaints, track progress, and contribute to a cleaner and safer city.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose Our Smart City Portal?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Designed to make communication between citizens and city
            departments simple, transparent, and efficient.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-2xl border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {reason.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;