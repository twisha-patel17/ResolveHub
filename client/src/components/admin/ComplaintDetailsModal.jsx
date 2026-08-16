import { useState } from "react";

import {
  X,
  CalendarDays,
  Tag,
  AlertCircle,
  FileText,
  MessageSquare,
  MapPin,
  Clock3,
  ShieldCheck,
  Image as ImageIcon,
  Send,
} from "lucide-react";

const ComplaintDetailsModal = ({
  complaint,
  onClose,
  onStatusChange,
  onReply,
  updating,
}) => {
  const [reply, setReply] = useState("");

  if (!complaint) {
    return null;
  }

  const statusStyles = {
    Pending: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const priorityStyles = {
    Low: "bg-slate-100 text-slate-600",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
    Critical: "bg-red-100 text-red-700",
  };

  const getStatusClasses = (status) => {
    return (
      statusStyles[status] ||
      "bg-slate-100 text-slate-700"
    );
  };

  const getPriorityClasses = (priority) => {
    return (
      priorityStyles[priority] ||
      "bg-slate-100 text-slate-600"
    );
  };

  const getInitial = (name) => {
    if (!name) {
      return "U";
    }

    return name.charAt(0).toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleReply = () => {
    const message = reply.trim();

    if (!message || updating) {
      return;
    }

    onReply(message);
    setReply("");
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !updating
    ) {
      e.preventDefault();
      handleReply();
    }
  };

  const statusButton = (
    status,
    text,
    style
  ) => {
    return (
      <button
        type="button"
        disabled={updating}
        onClick={() => onStatusChange(status)}
        className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${style} disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {updating ? "Updating..." : text}
      </button>
    );
  };

  const createdByName =
    complaint.createdBy?.name || "Unknown";

  const assignedAdmin =
    complaint.assignedTo;

  const location =
    complaint.location?.address ||
    complaint.location?.city ||
    "Location not provided";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
              <FileText
                size={21}
                className="text-orange-500"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900">
                  Complaint Details
                </h2>

                <span className="hidden rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-600 sm:inline-flex">
                  ● Live
                </span>
              </div>

              <p className="truncate text-xs text-slate-400">
                #{complaint.complaintId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="overflow-y-auto bg-slate-50/50 p-5 sm:p-6">

          {/* ===================================================
              TOP SUMMARY
          ==================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="min-w-0">
                <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                  {complaint.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityClasses(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority || "No priority"}{" "}
                    priority
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClasses(
                      complaint.status
                    )}`}
                  >
                    <span className="mr-1">
                      ●
                    </span>

                    {complaint.status || "Unknown"}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 text-xs text-slate-400">
                <Clock3 size={15} />

                {formatDate(
                  complaint.createdAt
                )}
              </div>
            </div>

            {/* Description */}

            <div className="mt-6">
              <div className="mb-2 flex items-center gap-2">
                <FileText
                  size={17}
                  className="text-slate-400"
                />

                <h3 className="text-sm font-bold text-slate-800">
                  Complaint
                </h3>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {complaint.description ||
                  "No description provided."}
              </p>
            </div>

            {/* Meta */}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-5">

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin
                  size={17}
                  className="text-slate-400"
                />

                <span>
                  {location}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays
                  size={17}
                  className="text-slate-400"
                />

                <span>
                  {formatDate(
                    complaint.createdAt
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck
                  size={17}
                  className="text-slate-400"
                />

                <span>
                  {complaint.category || "Uncategorized"}
                </span>
              </div>

            </div>
          </div>

          {/* ===================================================
              CATEGORY / PRIORITY / USER
          ==================================================== */}

          <div className="mt-5 grid gap-5 lg:grid-cols-3">

            {/* Category */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Tag size={17} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Category
                </span>
              </div>

              <p className="mt-3 font-bold text-slate-800">
                {complaint.category || "—"}
              </p>
            </div>

            {/* Priority */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertCircle size={17} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Priority
                </span>
              </div>

              <div className="mt-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityClasses(
                    complaint.priority
                  )}`}
                >
                  {complaint.priority || "—"}
                </span>
              </div>
            </div>

            {/* Reporter */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  {getInitial(
                    createdByName
                  )}
                </div>

                <div className="min-w-0">

                  <p className="truncate font-bold text-slate-900">
                    {createdByName}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {complaint.createdBy?.email ||
                      "No email available"}
                  </p>

                </div>

              </div>
            </div>

          </div>

          {/* ===================================================
              EVIDENCE
          ==================================================== */}

          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center gap-2">
              <ImageIcon
                size={18}
                className="text-slate-500"
              />

              <h2 className="font-bold text-slate-900">
                Evidence
              </h2>
            </div>

            {complaint.images?.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

                {complaint.images.map(
                  (image, index) => (
                    <a
                      key={
                        image.public_id ||
                        image.publicId ||
                        index
                      }
                      href={image.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={image.url}
                        alt={`Evidence ${
                          index + 1
                        }`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                        <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 opacity-0 shadow-sm transition group-hover:opacity-100">
                          View image
                        </span>
                      </div>
                    </a>
                  )
                )}

              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-8">
                <div className="text-center">
                  <ImageIcon
                    size={28}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm text-slate-400">
                    No evidence uploaded
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              TIMELINE
          ==================================================== */}

          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="font-bold text-slate-900">
              Status Timeline
            </h2>

            {complaint.statusHistory?.length > 0 ? (
              <div className="relative mt-6 space-y-6">

                {complaint.statusHistory.map(
                  (item, index) => {
                    const isLast =
                      index ===
                      complaint.statusHistory.length - 1;

                    const isCurrent =
                      item.status ===
                      complaint.status;

                    return (
                      <div
                        key={
                          item._id ||
                          index
                        }
                        className="relative flex gap-4"
                      >

                        {!isLast && (
                          <div className="absolute left-[11px] top-7 h-[calc(100%+8px)] w-px bg-slate-200" />
                        )}

                        <div
                          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            isCurrent
                              ? "bg-orange-100 ring-4 ring-orange-50"
                              : "bg-green-100"
                          }`}
                        >
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              isCurrent
                                ? "bg-orange-500"
                                : "bg-green-500"
                            }`}
                          />
                        </div>

                        <div className="min-w-0">

                          <p className="font-semibold text-slate-900">
                            {item.message ||
                              `Marked ${item.status}`}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatDateTime(
                              item.updatedAt
                            )}
                          </p>

                          {item.status && (
                            <span
                              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          )}

                        </div>
                      </div>
                    );
                  }
                )}

              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                No timeline updates available yet.
              </div>
            )}
          </div>

          {/* ===================================================
              ASSIGNED ADMIN
          ==================================================== */}

          {assignedAdmin && (
            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {getInitial(
                    assignedAdmin.name
                  )}
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {assignedAdmin.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Assigned administrator
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ===================================================
              CONVERSATION
          ==================================================== */}

          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-2">
                <MessageSquare
                  size={19}
                  className="text-orange-500"
                />

                <h2 className="font-bold text-slate-900">
                  Conversation
                </h2>
              </div>

              <span className="hidden text-xs text-green-600 sm:block">
                ● Live updates
              </span>

            </div>

            <div className="mt-6 space-y-4">

              {complaint.replies?.length > 0 ? (
                complaint.replies.map(
                  (item, index) => {
                    const isAdmin =
                      item.sender === "admin";

                    return (
                      <div
                        key={
                          item._id ||
                          index
                        }
                        className={`flex ${
                          isAdmin
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`flex max-w-[90%] gap-3 ${
                            !isAdmin
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >

                          {/* Avatar */}

                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isAdmin
                                ? "bg-blue-100 text-blue-600"
                                : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {getInitial(
                              isAdmin
                                ? assignedAdmin?.name ||
                                    "Admin"
                                : createdByName
                            )}
                          </div>

                          {/* Message */}

                          <div className="min-w-0">

                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                isAdmin
                                  ? "rounded-tl-md bg-slate-100"
                                  : "rounded-tr-md bg-orange-100"
                              }`}
                            >

                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">

                                <span className="text-sm font-bold text-slate-900">
                                  {isAdmin
                                    ? assignedAdmin?.name ||
                                      "Administrator"
                                    : createdByName}
                                </span>

                                <span className="text-[11px] text-slate-400">
                                  {formatDateTime(
                                    item.createdAt
                                  )}
                                </span>

                              </div>

                              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                {item.message}
                              </p>

                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="rounded-2xl bg-slate-50 p-6 text-center">

                  <MessageSquare
                    size={28}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    No conversation yet.
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Send a message to communicate
                    with the user.
                  </p>
                </div>
              )}

            </div>

            {/* Reply */}

            <div className="mt-6 border-t border-slate-100 pt-5">

              <div className="flex flex-col gap-3">

                <textarea
                  value={reply}
                  onChange={(e) =>
                    setReply(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Write a reply to the user..."
                  rows={3}
                  disabled={updating}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

                <div className="flex items-center justify-between">

                  <p className="text-xs text-slate-400">
                    Press Enter to send • Shift + Enter for new line
                  </p>

                  <button
                    type="button"
                    onClick={handleReply}
                    disabled={
                      !reply.trim() ||
                      updating
                    }
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={16} />

                    {updating
                      ? "Sending..."
                      : "Send Reply"}
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>

            <div className="flex flex-wrap justify-end gap-2">

              {complaint.status === "Pending" &&
                statusButton(
                  "In Progress",
                  "Start Working",
                  "bg-blue-500 hover:bg-blue-600"
                )}

              {complaint.status ===
                "In Progress" && (
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