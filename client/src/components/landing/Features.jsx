import {
  BellRing,
  BarChart3,
  ShieldCheck,
  Clock3,
  Image,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Clock3,
      title: "Real-Time Tracking",
      description:
        "Track every complaint from submission to resolution with live status updates powered by Socket.IO.",
    },
    {
      icon: Image,
      title: "Image Evidence",
      description:
        "Attach multiple images to help administrators understand and resolve issues faster.",
    },
    {
      icon: BellRing,
      title: "Instant Notifications",
      description:
        "Receive notifications whenever your complaint status changes or an admin replies.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Protected with JWT authentication, role-based access control, and secure cloud storage.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Administrators gain insights with complaint trends, categories, and resolution statistics.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything you need to manage complaints efficiently
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            ResolveHub simplifies complaint management for both users and administrators
            with a modern, transparent, and real-time platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;