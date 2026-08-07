import {
  Upload,
  MapPin,
  Shield,
  Clock3,
  CircleCheck,
  X,
} from "lucide-react";

const ComplaintForm = () => {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Create complaint
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Give us the details — the more specific,
          the faster it gets resolved.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2.3fr_1fr]">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div>
            <label className="mb-2 block font-semibold text-slate-800">
              Complaint title
            </label>

            <input
              type="text"
              placeholder="e.g. Leaking pipe near main entrance"
              className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-slate-800">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Describe what happened, where, and when..."
              className="w-full resize-none rounded-xl border border-slate-300 p-5 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Category
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
                <option>Road</option>
                <option>Electricity</option>
                <option>Garbage</option>
                <option>Water Supply</option>
                <option>Traffic</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Priority
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-nonetransition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold">
              Location
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 transition-all duration-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
              <MapPin
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Block, floor, or landmark"
                className="w-full bg-transparent px-3 py-4 outline-none"
              />
            </div>
          </div>

          <div className="mt-6">

            <label className="mb-2 block font-semibold">
              Evidence photos
            </label>

            <div className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 focus-within:border-orange-500 focus-within:bg-orange-50 focus-within:ring-4 focus-within:ring-orange-100">
              <Upload
                size={42}
                className="text-orange-500"
              />

              <p className="mt-5 text-lg font-semibold">
                Drag and drop images here
              </p>

              <p className="text-slate-500">
                or
                <span className="ml-1 transition hover:text-orange-600 font-semibold text-orange-500">
                  browse
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-400">
                JPG, PNG, WEBP up to 10MB each
              </p>

            </div>

            <div className="mt-5 flex gap-3">

              <div className="relative h-20 w-20 rounded-xl bg-slate-100">

                <button className="absolute -right-2 -top-2 rounded-full bg-slate-600 p-1 text-white">
                  <X size={12} />
                </button>

              </div>

              <div className="relative h-20 w-20 rounded-xl bg-slate-100">

                <button className="absolute -right-2 -top-2 rounded-full bg-slate-600 p-1 text-white">
                  <X size={12} />
                </button>

              </div>

            </div>

          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-100 p-5">

            <Shield
              size={22}
              className="text-slate-500"
            />

            <p className="text-sm text-slate-600">
              Your name and contact details are only
              visible to admins handling this complaint —
              never shown to other users.
            </p>

          </div>

          <div className="mt-8 flex gap-4">

            <button className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600">
              Submit complaint
            </button>

            <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold">
              Save as draft
            </button>

          </div>

        </div>

        <div className="space-y-6">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-2xl font-bold">
              Complaint guidelines
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <CircleCheck className="text-green-500" />
                <p>Be specific about location and time</p>
              </div>

              <div className="flex gap-3">
                <CircleCheck className="text-green-500" />
                <p>Attach clear photos where possible</p>
              </div>

              <div className="flex gap-3">
                <CircleCheck className="text-green-500" />
                <p>Avoid duplicate submissions</p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-2xl font-bold">
              Supported file types
            </h3>

            <div className="flex gap-3">

              {["JPG", "PNG", "WEBP"].map((type) => (
                <span
                  key={type}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm"
                >
                  {type}
                </span>
              ))}

            </div>

            <p className="mt-5 text-lg">
              Max 5 files, 10MB each
            </p>

          </div>

          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">

            <div className="flex items-start gap-3">

              <Clock3 className="mt-1 text-orange-500" />

              <div>

                <h3 className="font-bold text-orange-600">
                  Expected resolution time
                </h3>

                <p className="mt-3 text-slate-700">
                  Medium-priority complaints are
                  typically resolved within
                  <span className="font-semibold">
                    {" "}48–72 hours
                  </span>
                  .
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintForm;