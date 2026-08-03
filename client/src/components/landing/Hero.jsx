import {
  ArrowRight,
  CirclePlus,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const Hero = () => {
  const highlights = [
    "Real-time updates",
    "Secure image uploads",
    "Live notifications",
    "Complaint tracking",
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">

        <div className="flex-1">

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Real-time status · powered by Socket.IO
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
            Report. Track.
            <br />
            Resolve
            <span className="text-orange-500">
              <br />— all in real time.
            </span>
          </h1>


          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            ResolveHub gives teams a single, transparent place to
            report complaints, attach evidence, and watch every status
            change happen instantly.
          </p>


          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-4 font-semibold text-white transition hover:bg-orange-600">
              <CirclePlus size={20} />
              Create Complaint
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-100">
              Learn More
              <ArrowRight size={18} />
            </button>
          </div>


          <div className="mt-10 grid grid-cols-2 gap-4 text-sm font-medium text-slate-700">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2
                  className="text-green-500"
                  size={18}
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

            <div className="absolute -right-4 -top-4 rounded-full bg-white px-4 py-2 shadow-md">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                3 online now
              </span>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              In Progress
            </span>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Leaking pipe near Block C entrance
            </h3>

            <p className="mt-2 text-slate-500">
              Reported by Aditi Sharma · 2 min ago
            </p>

            <div className="mt-8 flex gap-3">
              <div className="h-20 w-20 rounded-xl bg-slate-200"></div>
              <div className="h-20 w-20 rounded-xl bg-slate-200"></div>

              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-orange-100 font-bold text-orange-600">
                +3
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <CheckCircle2
                  className="text-green-500"
                  size={26}
                />

                <div>
                  <p className="font-semibold">
                    Complaint Created
                  </p>

                  <p className="text-sm text-slate-500">
                    Today, 9:02 AM
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3
                  className="text-orange-500"
                  size={26}
                />

                <div>
                  <p className="font-semibold">
                    Admin Reviewing
                  </p>

                  <p className="text-sm text-slate-500">
                    Updating live...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;