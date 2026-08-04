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

      localStorage.setItem("accessToken", response.data.accessToken);

      localStorage.setItem("user", JSON.stringify(response.data.user));

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
    <div className="w-full max-w-md">
      <h1 className="text-5xl font-bold text-slate-900">
        Welcome Back
      </h1>

      <p className="mt-3 text-slate-500">
        Login to continue managing your complaints.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block font-medium">
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

        {/* Password */}
        <div>
          <label className="mb-2 block font-medium">
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
              className={`w-full rounded-xl px-5 py-3 pr-12 outline-none transition ${
                errors.password
                  ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              }`}
            />

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed"
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
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              disabled={loading}
              className="accent-orange-500"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Buttons */}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-slate-500">
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