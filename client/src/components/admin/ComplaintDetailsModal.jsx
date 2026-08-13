import {
  X,
  User,
  Mail,
  CalendarDays,
  Tag,
  AlertCircle,
  FileText,
} from "lucide-react";

const ComplaintDetailsModal = ({
  complaint,
  onClose,
  onStatusChange,
  updating,
}) => {
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
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
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
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[complaint.status] ||
                  "bg-slate-100 text-slate-600"
                }`}
              >
                {complaint.status}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  priorityStyles[complaint.priority] ||
                  "bg-slate-100 text-slate-600"
                }`}
              >
                {complaint.priority}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl border bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={17} className="text-slate-500" />
              <h4 className="font-semibold text-slate-800">Complaint</h4>
            </div>

            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {complaint.description || "No description provided."}
            </p>
          </div>

          {/* Details */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Tag size={16} />
                <span className="text-xs font-medium uppercase tracking-wide">
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
                <span className="text-xs font-medium uppercase tracking-wide">
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

          {/* Date */}
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
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>

            <div className="flex flex-wrap gap-2">
              {complaint.status === "Pending" && (
                <button
                  disabled={updating}
                  onClick={() => onStatusChange("In Progress")}
                  className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Start Working"}
                </button>
              )}

              {complaint.status === "In Progress" && (
                <>
                  <button
                    disabled={updating}
                    onClick={() => onStatusChange("Resolved")}
                    className="rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-600 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Resolve"}
                  </button>

                  <button
                    disabled={updating}
                    onClick={() => onStatusChange("Rejected")}
                    className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Reject"}
                  </button>
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