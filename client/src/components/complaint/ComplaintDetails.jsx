import {
  ArrowLeft,
  Clock3,
  MapPin,
  MessageCircle,
  Send,
  Trash2,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

import { useEffect, useState } from "react";

import socket from "../../sockets/socket";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import api from "../../lib/axios";

const ComplaintDetails = ({ complaintId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [reply, setReply] = useState("");

  const { user } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | SOCKET CONNECTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user?._id || !complaintId) {
      return;
    }

    const joinRoom = () => {
      console.log("🔌 Socket connected:", socket.id);

      socket.emit("join-user", user._id);

      socket.emit(
        "join-complaint",
        complaintId
      );

      console.log(
        `💬 Joined complaint room: complaint:${complaintId}`
      );
    };

    /*
     * If already connected, join immediately.
     * Otherwise connect first.
     */
    if (socket.connected) {
      joinRoom();
    } else {
      socket.connect();
    }

    socket.on("connect", joinRoom);

    /*
    |--------------------------------------------------------------------------
    | NEW REPLY
    |--------------------------------------------------------------------------
    */

    const handleNewReply = (data) => {
      console.log(
        "💬 complaint:reply received:",
        data
      );

      /*
       * Backend might send:
       *
       * {
       *   complaintId,
       *   reply
       * }
       *
       * or:
       *
       * {
       *   complaintId,
       *   data: reply
       * }
       *
       * or directly the reply.
       */

      const incomingComplaintId =
        data?.complaintId ||
        data?.complaint?._id ||
        data?.complaint?._id?.toString();

      if (
        incomingComplaintId &&
        incomingComplaintId.toString() !==
          complaintId.toString()
      ) {
        return;
      }

      const incomingReply =
        data?.reply ||
        data?.data ||
        data?.message;

      /*
       * If backend sends just a string,
       * don't try to render it as an object.
       */
      if (
        !incomingReply ||
        typeof incomingReply !== "object"
      ) {
        console.warn(
          "⚠️ Invalid reply payload:",
          data
        );

        queryClient.invalidateQueries({
          queryKey: [
            "complaint",
            complaintId,
          ],
        });

        return;
      }

      queryClient.setQueryData(
        ["complaint", complaintId],
        (oldComplaint) => {
          if (!oldComplaint) {
            return oldComplaint;
          }

          const currentReplies =
            oldComplaint.replies || [];

          const incomingId =
            incomingReply._id?.toString();

          /*
           * Prevent duplicate replies.
           */
          const alreadyExists =
            incomingId &&
            currentReplies.some(
              (item) =>
                item._id?.toString() ===
                incomingId
            );

          if (alreadyExists) {
            return oldComplaint;
          }

          return {
            ...oldComplaint,

            replies: [
              ...currentReplies,
              incomingReply,
            ],
          };
        }
      );
    };

    socket.on(
      "complaint:reply",
      handleNewReply
    );

    /*
    |--------------------------------------------------------------------------
    | SOCKET ERROR
    |--------------------------------------------------------------------------
    */

    const handleConnectError = (error) => {
      console.error(
        "❌ Socket connection error:",
        error
      );
    };

    socket.on(
      "connect_error",
      handleConnectError
    );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      socket.off("connect", joinRoom);

      socket.off(
        "complaint:reply",
        handleNewReply
      );

      socket.off(
        "connect_error",
        handleConnectError
      );

      if (socket.connected) {
        socket.emit(
          "leave-complaint",
          complaintId
        );
      }

      console.log(
        `💬 Left complaint room: complaint:${complaintId}`
      );
    };
  }, [
    user?._id,
    complaintId,
    queryClient,
  ]);

  /*
  |--------------------------------------------------------------------------
  | GET COMPLAINT
  |--------------------------------------------------------------------------
  */

  const {
    data: complaint,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "complaint",
      complaintId,
    ],

    queryFn: async () => {
      const response = await api.get(
        `/complaints/${complaintId}`
      );

      return response.data.data;
    },

    enabled: Boolean(complaintId),
  });

  /*
  |--------------------------------------------------------------------------
  | DELETE COMPLAINT
  |--------------------------------------------------------------------------
  */

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        `/complaints/${complaintId}`
      );

      return response.data;
    },

    onSuccess: (response) => {
      toast.success(
        response?.message ||
          "Complaint deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });

      queryClient.removeQueries({
        queryKey: [
          "complaint",
          complaintId,
        ],
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

  /*
  |--------------------------------------------------------------------------
  | REPLY
  |--------------------------------------------------------------------------
  */

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

    onSuccess: (result) => {
      /*
       * IMPORTANT:
       *
       * Do not blindly replace the complaint.
       *
       * Depending on your backend, result may be:
       *
       * 1. complete complaint
       * 2. newly created reply
       *
       * So we handle both.
       */

      queryClient.setQueryData(
        ["complaint", complaintId],
        (oldComplaint) => {
          if (!oldComplaint) {
            return oldComplaint;
          }

          /*
           * If backend returned complete complaint
           */
          if (
            result?.replies &&
            Array.isArray(result.replies)
          ) {
            return result;
          }

          /*
           * Otherwise assume result is the
           * newly created reply.
           */

          const newReply =
            result?.reply || result;

          if (
            !newReply ||
            typeof newReply !== "object"
          ) {
            return oldComplaint;
          }

          const currentReplies =
            oldComplaint.replies || [];

          const newReplyId =
            newReply._id?.toString();

          const exists =
            newReplyId &&
            currentReplies.some(
              (item) =>
                item._id?.toString() ===
                newReplyId
            );

          if (exists) {
            return oldComplaint;
          }

          return {
            ...oldComplaint,

            replies: [
              ...currentReplies,
              newReply,
            ],
          };
        }
      );

      /*
       * Refresh complaint list.
       */
      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });

      setReply("");

      toast.success(
        "Reply sent successfully"
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reply"
      );
    },
  });

  /*
  |--------------------------------------------------------------------------
  | HANDLERS
  |--------------------------------------------------------------------------
  */

  const handleReply = () => {
    const message = reply.trim();

    if (!message) {
      toast.error(
        "Please enter a reply"
      );

      return;
    }

    if (replyMutation.isPending) {
      return;
    }

    replyMutation.mutate(message);
  };

  const handleDelete = () => {
    if (deleteMutation.isPending) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate();
  };

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  const getInitial = (name) => {
    if (!name) {
      return "U";
    }

    return name
      .charAt(0)
      .toUpperCase();
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-slate-100 text-slate-600";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Urgent":
        return "bg-red-100 text-red-700";

      case "Critical":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading complaint...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-bold text-red-700">
          Failed to load complaint
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error?.response?.data?.message ||
            "Something went wrong while loading this complaint."}
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
          >
            Try again
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/complaints")
            }
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!complaint) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Complaint not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          This complaint may have been deleted
          or does not exist.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/complaints")
          }
          className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back to complaints
        </button>
      </div>
    );
  }

  const createdByName =
    complaint.createdBy?.name || "You";

  const assignedAdmin =
    complaint.assignedTo;

  return (
    <div className="space-y-6">

      {/* BACK */}

      <button
        type="button"
        onClick={() =>
          navigate("/complaints")
        }
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Back to my complaints
      </button>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_320px]">

        {/* =========================================================
            LEFT
        ========================================================= */}

        <div className="min-w-0 space-y-6">

          {/* COMPLAINT */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-wrap items-center gap-2">

              <span className="font-semibold text-slate-500">
                #{complaint.complaintId}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityClasses(
                  complaint.priority
                )}`}
              >
                {complaint.priority} priority
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClasses(
                  complaint.status
                )}`}
              >
                <span className="mr-1">
                  ●
                </span>

                {complaint.status}
              </span>

              <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                <span className="mr-1">
                  ●
                </span>

                Live
              </span>

            </div>

            <h1 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {complaint.title}
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              {complaint.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-b border-slate-100 pb-6 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <MapPin
                  size={17}
                  className="text-slate-400"
                />

                <span>
                  {complaint.location?.address ||
                    complaint.location?.city ||
                    "Location not provided"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3
                  size={17}
                  className="text-slate-400"
                />

                <span>
                  Created{" "}
                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-slate-400"
                />

                <span>
                  {complaint.category}
                </span>
              </div>

            </div>

            {/* EVIDENCE */}

            <div className="mt-6">

              <div className="flex items-center gap-2">

                <ImageIcon
                  size={18}
                  className="text-slate-500"
                />

                <h2 className="text-sm font-bold text-slate-900">
                  Evidence
                </h2>

              </div>

              {complaint.images?.length > 0 ? (

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {complaint.images.map(
                    (image, index) => (
                      <a
                        key={
                          image.public_id ||
                          index
                        }
                        href={image.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                      >
                        <img
                          src={image.url}
                          alt={`Complaint evidence ${
                            index + 1
                          }`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
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

          </div>

          {/* =====================================================
              TIMELINE
          ===================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <h2 className="text-xl font-bold text-slate-900">
              Timeline
            </h2>

            {complaint.statusHistory?.length > 0 ? (

              <div className="relative mt-7 space-y-7">

                {complaint.statusHistory.map(
                  (item, index) => {

                    const isLast =
                      index ===
                      complaint.statusHistory.length -
                        1;

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
                          <div className="absolute left-2.75 top-7 h-[calc(100%+12px)] w-px bg-slate-200" />
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

                          <p className="mt-0.5 text-sm text-slate-500">
                            {item.updatedAt
                              ? new Date(
                                  item.updatedAt
                                ).toLocaleString()
                              : "—"}
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

              <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                No timeline updates available yet.
              </div>

            )}

          </div>

          {/* =====================================================
              CONVERSATION
          ===================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2">

                <MessageCircle
                  size={20}
                  className="text-orange-500"
                />

                <h2 className="text-xl font-bold text-slate-900">
                  Conversation
                </h2>

              </div>

              {assignedAdmin && (
                <div className="flex items-center gap-2 text-sm text-slate-400">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  {assignedAdmin.name} is assigned

                </div>
              )}

            </div>

            <div className="mt-7 space-y-5">

              {complaint.replies?.length > 0 ? (

                complaint.replies.map(
                  (item, index) => {

                    const isUser =
                      item.sender ===
                      "user";

                    return (
                      <div
                        key={
                          item._id ||
                          index
                        }
                        className={`flex ${
                          isUser
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`flex max-w-[90%] gap-3 sm:max-w-[80%] ${
                            isUser
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >

                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isUser
                                ? "bg-orange-100 text-orange-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {isUser
                              ? getInitial(
                                  createdByName
                                )
                              : getInitial(
                                  item.senderName ||
                                    assignedAdmin?.name ||
                                    "Admin"
                                )}
                          </div>

                          <div>

                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                isUser
                                  ? "rounded-tr-md bg-orange-100"
                                  : "rounded-tl-md bg-slate-100"
                              }`}
                            >

                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">

                                <span className="text-sm font-bold text-slate-900">
                                  {isUser
                                    ? "You"
                                    : item.senderName ||
                                      assignedAdmin?.name ||
                                      "Administrator"}
                                </span>

                                <span className="text-xs text-slate-400">
                                  {item.createdAt
                                    ? new Date(
                                        item.createdAt
                                      ).toLocaleString()
                                    : ""}
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

                  <MessageCircle
                    size={28}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm text-slate-500">
                    No conversation yet.
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Send a message to communicate
                    with the administrator.
                  </p>

                </div>

              )}

            </div>

            {/* REPLY INPUT */}

            <div className="mt-7 border-t border-slate-100 pt-5">

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  value={reply}
                  onChange={(e) =>
                    setReply(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();

                      if (
                        !replyMutation.isPending
                      ) {
                        handleReply();
                      }
                    }
                  }}
                  placeholder="Write a reply..."
                  disabled={
                    replyMutation.isPending
                  }
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={handleReply}
                  disabled={
                    replyMutation.isPending ||
                    !reply.trim()
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <Send size={17} />

                  {replyMutation.isPending
                    ? "Sending..."
                    : "Send"}

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            RIGHT SIDEBAR
        ========================================================= */}

        <div className="space-y-6">

          {/* REPORTED BY */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              Reported by
            </h3>

            <div className="mt-5 flex items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                {getInitial(
                  createdByName
                )}
              </div>

              <div className="min-w-0">

                <p className="truncate font-semibold text-slate-900">
                  {createdByName}
                </p>

                <p className="text-sm text-slate-500">
                  Reporter
                </p>

              </div>

            </div>

          </div>

          {/* ADMIN */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              Assigned admin
            </h3>

            {assignedAdmin ? (

              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {getInitial(
                    assignedAdmin.name
                  )}
                </div>

                <div className="min-w-0">

                  <p className="truncate font-semibold text-slate-900">
                    {assignedAdmin.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-green-600">

                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    Assigned

                  </div>

                </div>

              </div>

            ) : (

              <div className="mt-5 rounded-xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  No administrator has been assigned yet.
                </p>

              </div>

            )}

          </div>

          {/* STATUS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div
                className={`rounded-xl p-3 ${getStatusClasses(
                  complaint.status
                )}`}
              >
                <Clock3 size={20} />
              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Current status
                </p>

                <p className="mt-0.5 font-bold text-slate-900">
                  {complaint.status}
                </p>

              </div>

            </div>

          </div>

          {/* DELETE */}

          {complaint.status ===
            "Pending" && (

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-red-100 p-2.5">

                  <Trash2
                    size={19}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h3 className="font-bold text-red-700">
                    Delete complaint
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-red-600">
                    You can delete this complaint
                    while it is still pending.
                  </p>

                </div>

              </div>

              <button
                type="button"
                disabled={
                  deleteMutation.isPending
                }
                onClick={handleDelete}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <Trash2 size={17} />

                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete complaint"}

              </button>

            </div>
          )}

          {/* TRACKING */}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

            <div className="flex items-start gap-3">

              <div className="rounded-xl bg-white p-2.5 shadow-sm">

                <ShieldCheck
                  size={19}
                  className="text-slate-500"
                />

              </div>

              <div>

                <h3 className="font-semibold text-slate-800">
                  Complaint tracking
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You can track status changes and
                  communicate with the assigned
                  administrator here.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintDetails;