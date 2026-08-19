import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Mail,
  LockKeyhole,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/adminAuth.service";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../utils/regex";

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: loginAdmin,

    onSuccess: (response) => {
      const admin = response.data.user;

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(admin)
      );

      toast.success("Admin login successful 🎉");

      navigate("/admin/dashboard");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Invalid admin credentials"
      );

      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    },
  });

  const loading = loginMutation.isPending;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and one special character.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    loginMutation.mutate({
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      {/* Brand */}
      <div className="mb-5 sm:mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500">
          <ShieldCheck
            size={20}
            className="text-white sm:w-[21px] sm:h-[21px]"
          />
        </div>

        <div className="text-base sm:text-lg font-semibold">
          <span className="text-slate-900">
            ResolveHub
          </span>

          <span className="font-normal text-slate-500">
            {" "}Admin
          </span>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-6 sm:mb-7">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-slate-900">
          Admin sign in
        </h1>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
          Restricted access. Authorized staff only.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block text-xs sm:text-sm font-semibold text-slate-800">
            Admin email
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              autoComplete="email"
              disabled={loading}
              placeholder="admin@resolvehub.io"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white py-3 sm:py-3.5 pl-10 sm:pl-11 pr-4 text-sm text-slate-800 outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-[11px] sm:text-xs leading-relaxed text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-xs sm:text-sm font-semibold text-slate-800">
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              disabled={loading}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white py-3 sm:py-3.5 pl-10 sm:pl-11 pr-12 text-sm text-slate-800 outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-[11px] sm:text-xs leading-relaxed text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 sm:py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {loading
            ? "Signing in..."
            : "Sign in to admin console"}
        </button>

        <div className="pt-1 text-center">
          <Link
            to="/login"
            className="inline-block px-2 py-1 text-xs sm:text-sm text-slate-500 transition hover:text-blue-600"
          >
            ← Back to regular login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;