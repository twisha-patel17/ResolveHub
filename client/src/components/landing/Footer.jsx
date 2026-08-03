import { Link } from "react-router-dom";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "How It Works",
      href: "#how-it-works",
    },
    {
      name: "FAQ",
      href: "#faq",
    },
    {
      name: "Contact",
      href: "#footer",
    },
  ];

  return (
    <footer
      id="footer"
      className="bg-slate-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500">
                <Shield size={22} />
              </div>

              <span className="text-2xl font-bold">
                ResolveHub
              </span>
            </Link>

            <p className="mt-6 leading-7 text-slate-400">
              A modern complaint management platform with real-time
              tracking, secure authentication, and transparent
              communication between users and administrators.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition hover:text-orange-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Contact
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={18} />
                support@resolvehub.io
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={18} />
                +91 98765 43210
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={18} />
                Gujarat, India
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Follow Us
            </h3>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-orange-500"
              >
                <FaGithub size={22} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-orange-500"
              >
                <FaLinkedin size={22} />
              </a>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Built using MERN Stack, JWT Authentication, Socket.IO,
              Cloudinary, and MongoDB.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
            <p>
              © {new Date().getFullYear()} ResolveHub. All rights reserved.
            </p>

            <p>
              Made with ❤️ using React, Node.js & MongoDB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;