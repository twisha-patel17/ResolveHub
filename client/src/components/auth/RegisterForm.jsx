import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { registerUser } from "../../services/auth.service";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  NAME_REGEX,
} from "../../utils/regex";

const RegisterForm = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Account created successfully! 🎉"
      );

      navigate("/login");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    },
  });

  const loading = registerMutation.isPending;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!NAME_REGEX.test(formData.name.trim())) {
      newErrors.name =
        "Only letters and spaces are allowed.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password =
        "8-20 chars with uppercase, lowercase, number & special character.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!formData.agree) {
      newErrors.agree =
        "You must accept Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateForm()) return;

    registerMutation.mutate({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-7 md:p-10">

      {/* Brand */}
      <div className="mb-6 flex items-center gap-3 sm:mb-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white sm:h-12 sm:w-12 sm:rounded-xl">
          <Shield size={20} className="sm:h-[22px] sm:w-[22px]" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          ResolveHub
        </h2>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
        Create Account
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
        Join ResolveHub and start tracking complaints.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-5 sm:mt-8"
      >

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            disabled={loading}
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition sm:px-5 sm:py-3.5 sm:text-base ${
              errors.name
                ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            }`}
          />

          {errors.name && (
            <p className="mt-2 text-xs leading-relaxed text-red-500 sm:text-sm">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            autoComplete="email"
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition sm:px-5 sm:py-3.5 sm:text-base ${
              errors.email
                ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            }`}
          />

          {errors.email && (
            <p className="mt-2 text-xs leading-relaxed text-red-500 sm:text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition sm:px-5 sm:py-3.5 sm:text-base ${
                errors.password
                  ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              }`}
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed sm:right-4"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-xs leading-relaxed text-red-500 sm:text-sm">
              {errors.password}
            </p>
          )}

          <p className="mt-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
            Password must contain at least 8 characters,
            one uppercase letter, one lowercase letter,
            one number and one special character.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition sm:px-5 sm:py-3.5 sm:text-base ${
                errors.confirmPassword
                  ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              }`}
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed sm:right-4"
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-xs leading-relaxed text-red-500 sm:text-sm">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700 sm:gap-3 sm:text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              disabled={loading}
              className="mt-0.5 h-4 w-4 shrink-0 accent-orange-500"
            />

            <span>
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-medium text-orange-500 hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="font-medium text-orange-500 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          {errors.agree && (
            <p className="mt-2 text-xs leading-relaxed text-red-500 sm:text-sm">
              {errors.agree}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <Link
            to="/"
            className="rounded-xl border border-slate-300 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:py-3.5 sm:text-base"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-orange-300 sm:py-3.5 sm:text-base"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        {/* Login */}
        <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 transition hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;