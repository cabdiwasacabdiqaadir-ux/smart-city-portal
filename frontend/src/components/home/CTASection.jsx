import { Link } from "react-router-dom";
import { ArrowRight, MessageSquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-blue-600 px-8 py-16 text-center text-white shadow-xl md:px-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <MessageSquarePlus className="h-8 w-8" />
          </div>

          <h2 className="mt-8 text-4xl font-bold">
            Ready to Improve Your City?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Report problems, track complaints, and work together with city
            departments to create a cleaner, safer, and smarter community.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              asChild
            >
              <Link
                to="/register"
                className="flex items-center whitespace-nowrap"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link
                to="/contact"
                className="flex items-center whitespace-nowrap text-black hover:text-gray-600"
              >
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;