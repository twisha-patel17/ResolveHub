import {
  ArrowLeft,
  Tag,
  MapPin,
  CalendarDays,
  Image as ImageIcon,
  CircleCheck,
  Clock3,
  Edit3,
  Download,
  Trash2,
  Paperclip,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComplaintDetails = () => {
  const timeline = [
    {
      title: "Complaint created",
      description: "Aug 1, 9:02 AM by Twisha S.",
      type: "completed",
    },
    {
      title: "Marked Pending",
      description: "Aug 1, 9:15 AM",
      type: "completed",
    },
    {
      title: "Assigned to Rohan Verma",
      description: "Aug 1, 10:05 AM",
      type: "completed",
    },
    {
      title: "Marked In Progress",
      description: "Aug 1, 10:40 AM",
      type: "completed",
    },
    {
      title: "Resolved",
      description: "Pending",
      type: "pending",
    },
    {
      title: "Closed",
      description: "Pending",
      type: "pending",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      <button type="button" onClick={() => navigate("/complaints")} className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500">
        <ArrowLeft size={17} />
        Back to my complaints
      </button>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2.3fr)_310px]">

        <div className="space-y-6">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex flex-wrap items-center gap-2">

                <span className="text-sm font-medium text-slate-500">
                  #RH-2049
                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                  High priority
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  In Progress
                </span>

              </div>

              <span className="flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Live
              </span>

            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Leaking pipe near Block C entrance
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600 sm:text-[15px]">
              There's a steady water leak coming from the pipe joint just
              outside the Block C entrance. It's been going on since this
              morning and is starting to pool near the walkway — could be a
              slipping hazard.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-b border-slate-200 pb-5">

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Tag size={17} />
                Infrastructure
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={17} />
                Block C, Ground Floor
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={17} />
                Created Aug 1, 2026
              </div>

            </div>

 
            <div className="mt-5">

              <h2 className="mb-3 text-lg font-bold text-slate-900">
                Evidence
              </h2>

              <div className="flex flex-wrap gap-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-slate-100 transition hover:ring-2 hover:ring-orange-400"
                  >
                    <ImageIcon
                      size={24}
                      className="text-slate-400"
                    />
                  </div>
                ))}

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <h2 className="text-xl font-bold text-slate-900">
              Timeline
            </h2>

            <div className="mt-6">

              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >

                  {index !== timeline.length - 1 && (
                    <div
                      className={`absolute left-3 top-7 h-full w-px ${
                        item.type === "completed"
                          ? "bg-green-200"
                          : "bg-slate-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      item.type === "completed"
                        ? "bg-green-100 text-green-500"
                        : "border border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {item.type === "completed" ? (
                      <CircleCheck size={18} />
                    ) : (
                      <Clock3 size={15} />
                    )}
                  </div>

                  <div>
                    <p
                      className={`font-semibold ${
                        item.type === "completed"
                          ? "text-slate-800"
                          : "text-slate-500"
                      }`}
                    >
                      {item.title}
                    </p>

                    <p className="mt-0.5 text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <h2 className="text-xl font-bold text-slate-900">
                Conversation
              </h2>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Admin Rohan is typing...
              </div>

            </div>

            <div className="mt-5 flex justify-center">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                ✓ Complaint marked In Progress · 10:40 AM
              </span>
            </div>

            <div className="mt-5 flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                AR
              </div>

              <div>

                <p className="text-xs font-semibold text-slate-800">
                  Admin Rohan
                  <span className="ml-2 font-normal text-slate-400">
                    · 20 min ago
                  </span>
                </p>

                <div className="mt-1 rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  Sent a plumber to inspect — should be there within the hour.
                </div>

              </div>

            </div>

            <div className="mt-5 flex justify-end">

              <div className="flex items-end gap-3">

                <div>

                  <p className="text-right text-xs font-semibold text-slate-800">
                    You
                    <span className="ml-2 font-normal text-slate-400">
                      · 12 min ago
                    </span>
                  </p>

                  <div className="mt-1 rounded-2xl rounded-tr-md bg-orange-100 px-4 py-3 text-sm text-slate-700">
                    Thank you, appreciate the quick response!
                  </div>

                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-400 text-xs font-bold text-white">
                  TS
                </div>

              </div>

            </div>

            <div className="mt-6 flex gap-2">

              <input
                type="text"
                placeholder="Write a reply..."
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <button
                type="button"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-500"
              >
                <Paperclip size={19} />
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                <Send size={16} />
                <span className="hidden sm:inline">
                  Send
                </span>
              </button>

            </div>

          </div>

        </div>

        <div className="space-y-6">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              Reported by
            </h3>

            <div className="mt-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400 font-bold text-white">
                TS
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Twisha Sharma
                </p>

                <p className="text-sm text-slate-500">
                  Reporter
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              Assigned admin
            </h3>

            <div className="mt-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                AR
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Rohan Verma
                </p>

                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Online now
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="space-y-2">

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
              >
                <Edit3 size={16} />
                Update status
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
              >
                <Download size={16} />
                Download report
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                <Trash2 size={16} />
                Delete complaint
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintDetails;