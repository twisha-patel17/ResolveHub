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
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import socket from "../../sockets/socket";

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

  const { user } = useAuth();

  const [reply, setReply] = useState("");

  useEffect(() => {
    if (!user?._id || !complaintId) {
      return;
    }

    const complaintRoom = complaintId.toString();

    const joinRooms = () => {
      socket.emit("join-user", user._id);
      socket.emit("join-complaint", complaintRoom);
    };

    const handleNewReply = (data) => {
      const incomingComplaintId =
        data?.complaintId?.toString();

      if (
        incomingComplaintId &&
        incomingComplaintId !== complaintRoom
      ) {
        return;
      }

      const incomingReply =
        data?.reply ||
        data?.data ||
        data;

      if (!incomingReply?._id) {
        return;
      }

      const incomingReplyId =
        incomingReply._id.toString();

      queryClient.setQueryData(
        ["complaint", complaintRoom],
        (oldComplaint) => {
          if (!oldComplaint) {
            return oldComplaint;
          }

          const currentReplies =
            oldComplaint.replies || [];

          const alreadyExists =
            currentReplies.some(
              (existingReply) =>
                existingReply?._id?.toString() ===
                incomingReplyId
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

    const handleConnectError = (error) => {
      console.error(
        "Socket connection error:",
        error
      );
    };

    const handleDisconnect = (reason) => {
      console.log(
        "Socket disconnected:",
        reason
      );
    };

    socket.on(
      "complaint:reply",
      handleNewReply
    );

    socket.on(
      "connect_error",
      handleConnectError
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    if (socket.connected) {
      joinRooms();
    } else {
      socket.connect();
    }

    socket.on("connect", joinRooms);

    return () => {
      socket.off(
        "connect",
        joinRooms
      );

      socket.off(
        "complaint:reply",
        handleNewReply
      );

      socket.off(
        "connect_error",
        handleConnectError
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      if (socket.connected) {
        socket.emit(
          "leave-complaint",
          complaintRoom
        );
      }
    };
  }, [
    user?._id,
    complaintId,
    queryClient,
  ]);

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

  const replyMutation = useMutation({
    mutationFn: async (message) => {
      const response = await api.post(
        `/complaints/${complaintId}/reply`,
        {
          message,
        }
      );

      return response.data;
    },

    onSuccess: () => {
      setReply("");

      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });

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
      case "Critical":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading complaint...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center sm:rounded-3xl sm:p-8">
        <h2 className="text-lg font-bold text-red-700 sm:text-xl">
          Failed to load complaint
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error?.response?.data?.message ||
            "Something went wrong while loading this complaint."}
        </p>

        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Try again
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/complaints")
            }
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
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
          className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
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
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">

      <button
        type="button"
        onClick={() =>
          navigate("/complaints")
        }
        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        <span>Back to my complaints</span>
      </button>

      <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,2fr)_320px]">

        <div className="min-w-0 space-y-4 sm:space-y-6">

          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-7">

            <div className="flex flex-wrap items-center gap-2">

              <span className="max-w-full break-all text-sm font-semibold text-slate-500 sm:text-base">
                #{complaint.complaintId}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold sm:px-3 sm:text-xs ${getPriorityClasses(
                  complaint.priority
                )}`}
              >
                {complaint.priority} priority
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold sm:px-3 sm:text-xs ${getStatusClasses(
                  complaint.status
                )}`}
              >
                <span className="mr-1">
                  ●
                </span>

                {complaint.status}
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-600 sm:ml-auto sm:px-3 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Live
              </span>

            </div>

            <h1 className="mt-4 break-words text-xl font-bold leading-tight text-slate-900 sm:mt-5 sm:text-2xl lg:text-3xl">
              {complaint.title}
            </h1>

            <p className="mt-3 break-words text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
              {complaint.description}
            </p>

            <div className="mt-5 grid gap-3 border-b border-slate-100 pb-5 sm:mt-6 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:pb-6">

              <div className="flex min-w-0 items-start gap-2 text-sm text-slate-500">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <span className="min-w-0 break-words">
                  {complaint.location?.address ||
                    complaint.location?.city ||
                    "Location not provided"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3
                  size={17}
                  className="shrink-0 text-slate-400"
                />

                <span>
                  Created{" "}
                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck
                  size={17}
                  className="shrink-0 text-slate-400"
                />

                <span className="break-words">
                  {complaint.category}
                </span>
              </div>

            </div>

            <div className="mt-5 sm:mt-6">

              <div className="flex items-center gap-2">
                <ImageIcon
                  size={18}
                  className="shrink-0 text-slate-500"
                />

                <h2 className="text-sm font-bold text-slate-900">
                  Evidence
                </h2>
              </div>

              {complaint.images?.length > 0 ? (

                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-3 sm:gap-3">

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
                        className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:rounded-2xl"
                      >
                        <img
                          src={image.url}
                          alt={`Complaint evidence ${
                            index + 1
                          }`}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 hidden items-center justify-center bg-black/20 transition group-hover:flex">
                          <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                            View image
                          </span>
                        </div>
                      </a>
                    )
                  )}

                </div>

              ) : (

                <div className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-7 sm:mt-4 sm:rounded-2xl sm:py-8">

                  <div className="px-4 text-center">

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

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-7">

            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Timeline
            </h2>

            {complaint.statusHistory?.length > 0 ? (

              <div className="relative mt-6 space-y-6 sm:mt-7 sm:space-y-7">

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
                        className="relative flex gap-3 sm:gap-4"
                      >

                        {!isLast && (
                          <div className="absolute left-2.5 top-6 h-[calc(100%+12px)] w-px bg-slate-200 sm:left-2.75 sm:top-7" />
                        )}

                        <div
                          className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
                            isCurrent
                              ? "bg-orange-100 ring-4 ring-orange-50"
                              : "bg-green-100"
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${
                              isCurrent
                                ? "bg-orange-500"
                                : "bg-green-500"
                            }`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="break-words text-sm font-semibold text-slate-900 sm:text-base">
                            {item.message ||
                              `Marked ${item.status}`}
                          </p>

                          <p className="mt-1 break-words text-xs text-slate-500 sm:text-sm">
                            {item.updatedAt
                              ? new Date(
                                  item.updatedAt
                                ).toLocaleString()
                              : "—"}
                          </p>

                          {item.status && (
                            <span
                              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${getStatusClasses(
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

              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500 sm:mt-6 sm:rounded-2xl sm:p-5">
                No timeline updates available yet.
              </div>
            )}

          </div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-7">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2">
                <MessageCircle
                  size={20}
                  className="shrink-0 text-orange-500"
                />

                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Conversation
                </h2>
              </div>

              {assignedAdmin && (
                <div className="flex max-w-full items-center gap-2 text-xs text-slate-400 sm:text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />

                  <span className="truncate">
                    {assignedAdmin.name} is assigned
                  </span>
                </div>
              )}

            </div>

            {/* MESSAGES */}

            <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">

              {complaint.replies?.length > 0 ? (

                complaint.replies.map(
                  (item, index) => {

                    const isUser =
                      item.sender === "user";

                    return (
                      <div
                        key={
                          item._id ||
                          index
                        }
                        className={`flex min-w-0 ${
                          isUser
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`flex min-w-0 max-w-[95%] gap-2.5 sm:max-w-[85%] sm:gap-3 ${
                            isUser
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >

                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-9 sm:w-9 ${
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

                          <div className="min-w-0 max-w-full">

                            <div
                              className={`min-w-0 rounded-2xl px-3.5 py-3 sm:px-4 ${
                                isUser
                                  ? "rounded-tr-md bg-orange-100"
                                  : "rounded-tl-md bg-slate-100"
                              }`}
                            >

                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">

                                <span className="text-xs font-bold text-slate-900 sm:text-sm">
                                  {isUser
                                    ? "You"
                                    : item.senderName ||
                                      assignedAdmin?.name ||
                                      "Administrator"}
                                </span>

                                <span className="text-[10px] text-slate-400 sm:text-xs">
                                  {item.createdAt
                                    ? new Date(
                                        item.createdAt
                                      ).toLocaleString()
                                    : ""}
                                </span>

                              </div>

                              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
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

                <div className="rounded-xl bg-slate-50 p-5 text-center sm:rounded-2xl sm:p-6">

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

            <div className="mt-6 border-t border-slate-100 pt-4 sm:mt-7 sm:pt-5">

              <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">

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
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={handleReply}
                  disabled={
                    replyMutation.isPending ||
                    !reply.trim()
                  }
                  className="flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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

        <div className="min-w-0 space-y-4 sm:space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

            <h3 className="font-bold text-slate-900">
              Reported by
            </h3>

            <div className="mt-4 flex items-center gap-3 sm:mt-5">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 sm:h-12 sm:w-12">
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

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

            <h3 className="font-bold text-slate-900">
              Assigned admin
            </h3>

            {assignedAdmin ? (

              <div className="mt-4 flex items-center gap-3 sm:mt-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 sm:h-12 sm:w-12">
                  {getInitial(
                    assignedAdmin.name
                  )}
                </div>

                <div className="min-w-0">

                  <p className="truncate font-semibold text-slate-900">
                    {assignedAdmin.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-green-600">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    Assigned
                  </div>

                </div>

              </div>

            ) : (

              <div className="mt-4 rounded-xl bg-slate-50 p-4 sm:mt-5">

                <p className="text-sm leading-5 text-slate-500">
                  No administrator has been assigned yet.
                </p>

              </div>
            )}

          </div>

          {/* STATUS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

            <div className="flex items-center gap-3">

              <div
                className={`shrink-0 rounded-xl p-2.5 sm:p-3 ${getStatusClasses(
                  complaint.status
                )}`}
              >
                <Clock3 size={20} />
              </div>

              <div className="min-w-0">

                <p className="text-sm text-slate-500">
                  Current status
                </p>

                <p className="mt-0.5 truncate font-bold text-slate-900">
                  {complaint.status}
                </p>

              </div>

            </div>

          </div>

          {/* DELETE */}

          {complaint.status ===
            "Pending" && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:rounded-3xl sm:p-6">

              <div className="flex items-start gap-3">

                <div className="shrink-0 rounded-xl bg-red-100 p-2.5">

                  <Trash2
                    size={19}
                    className="text-red-600"
                  />

                </div>

                <div className="min-w-0">

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
                className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5"
              >
                <Trash2 size={17} />

                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete complaint"}
              </button>

            </div>
          )}

          {/* TRACKING */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:rounded-3xl sm:p-6">

            <div className="flex items-start gap-3">

              <div className="shrink-0 rounded-xl bg-white p-2.5 shadow-sm">

                <ShieldCheck
                  size={19}
                  className="text-slate-500"
                />

              </div>

              <div className="min-w-0">

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