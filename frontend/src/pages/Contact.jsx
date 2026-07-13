import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Mail, Phone, MapPin, Send } from "lucide-react";

import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await emailjs.send(
        "service_5jl2snm",
        "template_4pdg6oo",
        data,
        "HyDDjUcKdCvQcMesi",
      );

      toast.success("Message sent successfully!");

      reset();
    } catch (error) {
      console.log(error);

      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Contact Smart City</h1>

          <p className="mt-4 text-muted-foreground">
            Send us your questions, suggestions, or feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Information */}

          <div className="space-y-5">
            <Card>
              <CardContent className="p-6 flex gap-4">
                <Mail className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    axmedja44@gmail.com
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex gap-4">
                <Phone className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +252 61 7449753
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex gap-4">
                <MapPin className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    mogadishu, Somalia
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Send Message</CardTitle>

              <CardDescription>
                We will reply as soon as possible.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Input placeholder="Your Name" {...register("name")} />

                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input placeholder="Your Email" {...register("email")} />

                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input placeholder="Subject" {...register("subject")} />

                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Write your message..."
                    rows={6}
                    {...register("message")}
                  />

                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
