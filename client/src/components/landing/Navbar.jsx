import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Shield } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "How it Works",
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Shield size={20} />
          </div>

          <span className="text-2xl font-bold text-slate-900">
            ResolveHub
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-slate-600 transition-all duration-300 hover:text-orange-500"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/login"
            className="font-medium text-slate-700 transition-all duration-300 hover:text-orange-500"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>

        <button
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-800 lg:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="space-y-5 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-slate-700 transition hover:text-orange-500"
              >
                {link.name}
              </a>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-slate-700 transition hover:text-orange-500"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;