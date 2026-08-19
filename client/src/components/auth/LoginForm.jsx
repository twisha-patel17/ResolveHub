import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/regex";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
    mutationFn: loginUser,

    onSuccess: (response) => {
      login(response.data.user);

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(
        response.message || "Login Successful 🎉"
      );

      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
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
    <div className="w-full max-w-md px-1 sm:px-0">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:mt-3 sm:text-base">
          Login to continue managing your complaints.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-5 sm:mt-10 sm:space-y-6"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800 sm:text-base">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            autoComplete="email"
            disabled={loading}
            placeholder="you@example.com"
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
          <label className="mb-2 block text-sm font-medium text-slate-800 sm:text-base">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              disabled={loading}
              placeholder="••••••••"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;