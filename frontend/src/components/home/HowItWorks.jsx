import {
  UserPlus,
  ClipboardPlus,
  Building2,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Register or log in securely to access the Smart City Portal.",
  },
  {
    icon: ClipboardPlus,
    title: "Submit a Complaint",
    description:
      "Choose a category, describe the issue, add the location, and submit your complaint.",
  },
  {
    icon: Building2,
    title: "Department Reviews",
    description:
      "The complaint is automatically assigned to the responsible department for action.",
  },
  {
    icon: CheckCircle2,
    title: "Track & Resolve",
    description:
      "Monitor your complaint status until the issue has been successfully resolved.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="mt-4 text-slate-600">
            Reporting a city issue is simple. Follow these four easy
            steps to help improve your community.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;