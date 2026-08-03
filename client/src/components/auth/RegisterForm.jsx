import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const RegisterForm = () => {
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

      <form className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" />
          I agree to the Terms & Conditions
        </label>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/"
            className="rounded-xl border border-slate-300 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;