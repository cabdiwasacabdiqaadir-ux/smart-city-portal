import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold text-blue-600">Smart City</h2>

            <p className="mt-4 text-sm text-muted-foreground">
              A smart platform that connects citizens with city departments to
              report problems and improve public services.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-blue-600 transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-blue-600 transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />

                <span>axmedja44@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />

                <span>+252 61 7449753</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />

                <span>Mogadishu, Somalia</span>
              </div>
            </div>
          </div>

          {/* Social */}

          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>

            <p className="mb-4 text-sm text-muted-foreground">
              Stay updated with Smart City news.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent transition"
              >
                F
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent transition"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent transition"
              >
                ◎
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Smart City Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
