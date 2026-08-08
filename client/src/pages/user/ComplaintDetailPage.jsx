import {
  ArrowLeft,
  Tag,
  MapPin,
  CalendarDays,
  Image,
  Pencil,
  Download,
  Trash2,
  CheckCircle2,
  Circle,
  Send,
  Paperclip,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

const ComplaintDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-6">

      {/* BACK */}
      <button
        onClick={() => navigate("/complaints")}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Back to my complaints
      </button>

      {/* MAIN GRID */}
      <div className="grid gap-6 xl:grid-cols-[2.3fr_1fr]">

        {/* LEFT */}
        <div className="space-y-6">

          {/* COMPLAINT CARD */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* TOP */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-sm font-medium text-slate-500">
                  #{id}
                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                  High priority
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-current" />
                  In Progress
                </span>

              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Live
              </span>

            </div>

            {/* TITLE */}
            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Leaking pipe near Block C entrance
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 leading-7 text-slate-600">
              There's a steady water leak coming from the pipe joint just
              outside the Block C entrance. It's been going on since this
              morning and is starting to pool near the walkway — could be a
              slipping hazard.
            </p>

            {/* META */}
            <div className="mt-5 flex flex-wrap gap-5 border-b border-slate-200 pb-6 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <Tag size={17} />
                Infrastructure
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={17} />
                Block C, Ground Floor
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={17} />
                Created Aug 1, 2026
              </div>

            </div>

            {/* EVIDENCE */}
            <div className="mt-5">

              <h2 className="text-lg font-bold text-slate-900">
                Evidence
              </h2>

              <div className="mt-4 flex flex-wrap gap-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-slate-100"
                  >
                    <Image
                      size={24}
                      className="text-slate-400"
                    />
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* TIMELINE */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              Timeline
            </h2>

            <div className="mt-6 space-y-6">

              <div className="flex gap-4">

                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-500"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    Complaint created
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Aug 1, 9:02 AM by Twisha S.
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-500"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    Marked Pending
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Aug 1, 9:30 AM
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <CheckCircle2
                  size={22}
                  className="shrink-0 text-blue-500"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    Marked In Progress
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Aug 1, 10:40 AM
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <Circle
                  size={22}
                  className="shrink-0 text-slate-300"
                />

                <div>
                  <p className="font-semibold text-slate-400">
                    Resolved
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Pending
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <Circle
                  size={22}
                  className="shrink-0 text-slate-300"
                />

                <div>
                  <p className="font-semibold text-slate-400">
                    Closed
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Pending
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* CONVERSATION */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-900">
                Conversation
              </h2>

              <span className="text-sm text-green-600">
                ● Admin Rohan is typing...
              </span>

            </div>

            {/* ADMIN MESSAGE */}
            <div className="mt-6 flex gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                AR
              </div>

              <div className="rounded-2xl bg-slate-100 px-4 py-3">

                <p className="text-sm font-semibold text-slate-700">
                  Admin Rohan
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  Sent a plumber to inspect — should be there within the hour.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  20 min ago
                </p>

              </div>

            </div>

            {/* USER MESSAGE */}
            <div className="mt-5 flex justify-end">

              <div className="max-w-md rounded-2xl bg-orange-100 px-4 py-3">

                <p className="text-sm font-semibold text-slate-700">
                  You · 12 min ago
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  Thank you, appreciate the quick response!
                </p>

              </div>

            </div>

            {/* REPLY */}
            <div className="mt-6 flex gap-2">

              <div className="relative flex-1">

                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
                >
                  <Paperclip size={18} />
                </button>

              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 font-semibold text-white transition hover:bg-orange-600"
              >
                <Send size={17} />
                Send
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* REPORTED BY */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              Reported by
            </h3>

            <div className="mt-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 font-bold text-white">
                TS
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Twisha Sharma
                </p>

                <p className="text-sm text-slate-500">
                  Reporter
                </p>
              </div>

            </div>

          </div>

          {/* ASSIGNED ADMIN */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              Assigned admin
            </h3>

            <div className="mt-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                AR
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Rohan Verma
                </p>

                <p className="text-sm text-green-600">
                  ● Online now
                </p>
              </div>

            </div>

          </div>

          {/* ACTIONS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 font-semibold text-slate-600 transition hover:border-orange-400 hover:text-orange-500">
              <Pencil size={17} />
              Update status
            </button>

            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 font-semibold text-slate-600 transition hover:border-orange-400 hover:text-orange-500">
              <Download size={17} />
              Download report
            </button>

            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600">
              <Trash2 size={17} />
              Delete complaint
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintDetailPage;