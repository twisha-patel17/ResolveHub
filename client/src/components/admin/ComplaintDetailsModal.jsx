import { useState } from "react";
import {
  X,
  User,
  Mail,
  CalendarDays,
  Tag,
  AlertCircle,
  FileText,
  MessageSquare,
} from "lucide-react";

const ComplaintDetailsModal = ({
  complaint,
  onClose,
  onStatusChange,
  onReply,
  updating,
}) => {
  const [reply, setReply] = useState("");

  if (!complaint) return null;

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const priorityStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  const date = complaint.createdAt
    ? new Date(complaint.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const badge = (styles, value) => (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[value] || "bg-slate-100 text-slate-600"
      }`}
    >
      {value || "—"}
    </span>
  );

  const statusButton = (status, text, style) => (
    <button
      type="button"
      disabled={updating}
      onClick={() => onStatusChange(status)}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${style} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {updating ? "Updating..." : text}
    </button>
  );

  const handleReply = () => {
    if (!reply.trim() || updating) return;

    onReply(reply.trim());
    setReply("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
              <FileText size={20} className="text-orange-500" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Complaint Details
              </h2>

              <p className="text-xs text-slate-400">
                {complaint.complaintId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6">

          {/* Title + Badges */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {complaint.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Submitted on {date}
              </p>
            </div>

            <div className="flex gap-2">
              {badge(statusStyles, complaint.status)}
              {badge(priorityStyles, complaint.priority)}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl border bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={17} className="text-slate-500" />

              <h4 className="font-semibold text-slate-800">
                Complaint
              </h4>
            </div>

            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {complaint.description || "No description provided."}
            </p>
          </div>

          {/* Category + Priority */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Tag size={16} />

                <span className="text-xs uppercase tracking-wide">
                  Category
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {complaint.category || "—"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertCircle size={16} />

                <span className="text-xs uppercase tracking-wide">
                  Priority
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {complaint.priority || "—"}
              </p>
            </div>
          </div>

          {/* User */}
          <div className="mt-5 rounded-xl border p-4">
            <div className="mb-4 flex items-center gap-2">
              <User size={17} className="text-slate-500" />

              <h4 className="font-semibold text-slate-800">
                Submitted By
              </h4>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Name
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {complaint.createdBy?.name || "Unknown"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                  <Mail size={13} />
                  Email
                </div>

                <p className="mt-1 break-all font-medium text-slate-700">
                  {complaint.createdBy?.email || "—"}
                </p>
              </div>

            </div>
          </div>

          {/* Submitted Date */}
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <CalendarDays size={18} className="text-slate-400" />

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Submitted
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {date}
              </p>
            </div>
          </div>

          {/* Replies */}
          <div className="mt-5 rounded-xl border p-4">

            <div className="mb-4 flex items-center gap-2">
              <MessageSquare size={17} className="text-slate-500" />

              <h4 className="font-semibold text-slate-800">
                Conversation
              </h4>
            </div>

            {complaint.replies?.length > 0 ? (
              <div className="space-y-3">
                {complaint.replies.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`rounded-xl p-3 ${
                      item.sender === "admin"
                        ? "ml-6 bg-orange-50"
                        : "mr-6 bg-slate-50"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">
                        {item.sender === "admin"
                          ? "Admin"
                          : "User"}
                      </span>

                      {item.createdAt && (
                        <span className="text-xs text-slate-400">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-5 text-slate-600">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No replies yet.
              </p>
            )}

            {/* Reply Input */}
            <div className="mt-4 border-t pt-4">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply to the user..."
                rows={3}
                disabled={updating}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100"
              />

              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleReply}
                  disabled={!reply.trim() || updating}
                  className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Close
            </button>

            <div className="flex flex-wrap gap-2">

              {complaint.status === "Pending" &&
                statusButton(
                  "In Progress",
                  "Start Working",
                  "bg-blue-500 hover:bg-blue-600"
                )}

              {complaint.status === "In Progress" && (
                <>
                  {statusButton(
                    "Resolved",
                    "Resolve",
                    "bg-green-500 hover:bg-green-600"
                  )}

                  {statusButton(
                    "Rejected",
                    "Reject",
                    "bg-red-500 hover:bg-red-600"
                  )}
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintDetailsModal;