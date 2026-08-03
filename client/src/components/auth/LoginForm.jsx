import { Link } from "react-router-dom";


const LoginForm = () => {
  return (
    <div className="w-full max-w-md">


      <h1 className="text-5xl font-bold text-slate-900">
        Welcome Back
      </h1>

      <p className="mt-3 text-slate-500">
        Login to continue managing your complaints.
      </p>

      <form className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>
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
            className="rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Login
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