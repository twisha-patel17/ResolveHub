import {
  ArrowLeft,
  Clock3,
  MapPin,
  MessageCircle,
  Send,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../../lib/axios";

const ComplaintDetails = ({ complaintId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [reply, setReply] = useState("");

  const {
    data: complaint,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["complaint", complaintId],

    queryFn: async () => {
      const response = await api.get(
        `/complaints/${complaintId}`
      );

      return response.data.data;
    },

    enabled: !!complaintId,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/complaints/${complaintId}`);
    },

    onSuccess: () => {
      toast.success("Complaint deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });

      navigate("/complaints");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete complaint"
      );
    },
  });

  const replyMutation = useMutation({
    mutationFn: async (message) => {
      const response = await api.post(
        `/complaints/${complaintId}/reply`,
        {
          message,
        }
      );

      return response.data.data;
    },

    onSuccess: (updatedComplaint) => {
      queryClient.setQueryData(
        ["complaint", complaintId],
        updatedComplaint
      );

      setReply("");

      toast.success("Reply sent successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reply"
      );
    },
  });

  const handleReply = () => {
    const message = reply.trim();

    if (!message) {
      toast.error("Please enter a reply");
      return;
    }

    replyMutation.mutate(message);
  };

  const handleDelete = () => {
    if (!window.confirm(
      "Are you sure you want to delete this complaint?"
    )) {
      return;
    }

    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Failed to load complaint
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error.response?.data?.message ||
            "Something went wrong"}
        </p>

        <button
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ["complaint", complaintId],
            })
          }
          className="mt-4 rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  return (
    <div className="space-y-6">

      <button
        type="button"
        onClick={() => navigate("/complaints")}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Back to my complaints
      </button>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>
          <p className="text-sm font-semibold text-orange-500">
            {complaint.complaintId}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {complaint.title}
          </h1>

          <p className="mt-2 text-slate-500">
            Created{" "}
            {new Date(
              complaint.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            {complaint.priority}
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {complaint.status}
          </span>

        </div>

      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              Complaint details
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {complaint.description}
            </p>

          </div>

          {complaint.location && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-orange-100 p-3">
                  <MapPin
                    size={20}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Location
                  </h2>

                  <p className="text-sm text-slate-500">
                    {complaint.location.address ||
                      "Location provided"}
                  </p>
                </div>

              </div>

            </div>
          )}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-2">

              <MessageCircle
                size={20}
                className="text-orange-500"
              />

              <h2 className="text-xl font-bold">
                Replies
              </h2>

            </div>

            <div className="mt-6 space-y-4">

              {complaint.replies?.length > 0 ? (
                complaint.replies.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">

                      <span className="font-semibold text-slate-800">
                        {item.sender === "admin"
                          ? "Administrator"
                          : "You"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </span>

                    </div>

                    <p className="mt-2 text-slate-600">
                      {item.message}
                    </p>

                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No replies yet.
                </p>
              )}

            </div>

            <div className="mt-6 flex gap-3">

              <input
                value={reply}
                onChange={(e) =>
                  setReply(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !replyMutation.isPending
                  ) {
                    handleReply();
                  }
                }}
                placeholder="Write a reply..."
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <button
                type="button"
                disabled={replyMutation.isPending}
                onClick={handleReply}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17} />

                {replyMutation.isPending
                  ? "Sending..."
                  : "Send"}
              </button>

            </div>

          </div>

        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3">
                <Clock3
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Current status
                </p>

                <p className="font-bold text-slate-900">
                  {complaint.status}
                </p>
              </div>

            </div>

          </div>

          {/* DELETE */}

          {complaint.status === "Pending" && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

              <h3 className="font-bold text-red-700">
                Delete complaint
              </h3>

              <p className="mt-2 text-sm text-red-600">
                You can delete this complaint while
                it is still pending.
              </p>

              <button
                type="button"
                disabled={deleteMutation.isPending}
                onClick={handleDelete}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                <Trash2 size={17} />

                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete complaint"}
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ComplaintDetails;