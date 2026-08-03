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
      response.data?.message || "Account created successfully! 🎉"
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

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
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
    } else if (
      !NAME_REGEX.test(formData.name.trim())
    ) {
      newErrors.name =
        "Only letters and spaces are allowed.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !EMAIL_REGEX.test(formData.email.trim())
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !PASSWORD_REGEX.test(formData.password)
    ) {
      newErrors.password =
        "8-20 chars with uppercase, lowercase, number & special character.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !==
      formData.confirmPassword
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
    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
          <Shield size={22} />
        </div>

        <h2 className="text-3xl font-bold text-slate-900">
          ResolveHub
        </h2>
      </div>

      <h1 className="text-4xl font-bold text-slate-900">
        Create Account
      </h1>

      <p className="mt-2 text-slate-500">
        Join ResolveHub and start tracking complaints.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <div>
          <label className="mb-2 block font-medium">
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
            className={`w-full rounded-xl px-5 py-3 outline-none transition ${
              errors.name
                ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            }`}
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
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
            className={`w-full rounded-xl px-5 py-3 outline-none transition ${
              errors.email
                ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            }`}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
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
              className={`w-full rounded-xl px-5 py-3 pr-12 outline-none transition ${
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-500">
            Password must contain at least 8 characters,
            one uppercase letter, one lowercase letter,
            one number and one special character.
          </p>
        </div>

        <div>
          <label className="mb-2 block font-medium">
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
              className={`w-full rounded-xl px-5 py-3 pr-12 outline-none transition ${
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

  
        <div>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 accent-orange-500"
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
            <p className="mt-2 text-sm text-red-500">
              {errors.agree}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/"
            className="rounded-xl border border-slate-300 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-500 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </div>

        <p className="text-center text-slate-500">
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