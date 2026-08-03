import { Shield } from "lucide-react";

const AuthBranding = () => {
  return (
    <div className="relative hidden overflow-hidden bg-linear-to-br from-orange-500 via-orange-400 to-orange-300 lg:flex lg:w-1/2">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-20 text-white">
        {/* Logo */}
        <div className="mb-14 flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
            <Shield size={28} />
          </div>

          <h1 className="text-4xl font-bold">
            ResolveHub
          </h1>
        </div>

        {/* Quote */}
        <p className="mt-6 max-w-md text-lg leading-8 text-orange-50">
          Every complaint deserves to be heard,
          tracked, and resolved.
        </p>

        {/* Features */}
        <div className="mt-12 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Track complaints in real time</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Receive instant status updates</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Secure complaint management</span>
          </div>
        </div>

        {/* Bottom Quote */}
        <p className="mt-16 border-l-4 border-white/40 pl-4 text-sm italic text-orange-100">
          "One platform. Every complaint. Complete transparency."
        </p>
      </div>
    </div>
  );
};

export default AuthBranding;