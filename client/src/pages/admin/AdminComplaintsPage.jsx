import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import ComplaintFilters from "../../components/admin/ComplaintFilters";
import AdminComplaintTable from "../../components/admin/AdminComplaintTable";
import ComplaintDetailsModal from "../../components/admin/ComplaintDetailsModal";

import {
  getAdminComplaints,
  updateComplaintStatus,
  addComplaintReply,
} from "../../services/adminComplaint.service";

const AdminComplaintsPage = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const filters = {
    page,
    limit: 10,

    ...(debouncedSearch.trim() && {
      search: debouncedSearch.trim(),
    }),

    ...(status !== "All" && {
      status,
    }),

    ...(priority !== "All" && {
      priority,
    }),

    ...(category !== "All" && {
      category,
    }),
  };

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["admin-complaints", filters],
    queryFn: () => getAdminComplaints(filters),
    placeholderData: (previousData) => previousData,
  });
  const updateStatusMutation = useMutation({
    mutationFn: updateComplaintStatus,

    onSuccess: (response) => {
      
      const updatedComplaint =
        response?.complaint ||
        response?.data ||
        response;

      if (
        updatedComplaint &&
        updatedComplaint._id
      ) {
        setSelectedComplaint((previous) => {
          if (!previous) {
            return updatedComplaint;
          }

          return {
            ...previous,
            ...updatedComplaint,

            replies:
              updatedComplaint.replies ??
              previous.replies ??
              [],
          };
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["admin-complaints"],
      });

      toast.success(
        "Complaint status updated successfully"
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update complaint status"
      );
    },
  });

  const replyMutation = useMutation({
    mutationFn: addComplaintReply,

    onSuccess: (response, variables) => {
      const message = variables?.message?.trim();

      const returnedComplaint =
        response?.complaint ||
        response?.data ||
        response;

      const returnedReply =
        response?.reply ||
        response?.data?.reply ||
        returnedComplaint?.reply;

      setSelectedComplaint((previous) => {
        if (!previous) {
          return previous;
        }

        const currentReplies = Array.isArray(
          previous.replies
        )
          ? previous.replies.filter(Boolean)
          : [];

        if (
          returnedComplaint &&
          returnedComplaint._id &&
          Array.isArray(returnedComplaint.replies)
        ) {
          return {
            ...previous,
            ...returnedComplaint,
            replies:
              returnedComplaint.replies.filter(Boolean),
          };
        }

        if (returnedReply) {
          return {
            ...previous,
            replies: [
              ...currentReplies,
              returnedReply,
            ],
          };
        }

        const localReply = {
          _id: `local-${Date.now()}`,
          sender: "admin",
          senderName:
            previous.assignedTo?.name ||
            "Administrator",
          message,
          createdAt: new Date().toISOString(),
        };

        return {
          ...previous,
          replies: [
            ...currentReplies,
            localReply,
          ],
        };
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-complaints"],
      });

      toast.success("Reply sent successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reply"
      );
    },
  });

  const complaints = data?.complaints || [];
  const totalPages = data?.totalPages || 1;

  const resetPage = () => {
    setPage(1);
  };

  const handleReply = (message) => {
    if (
      !selectedComplaint?._id ||
      !message?.trim() ||
      replyMutation.isPending
    ) {
      return;
    }

    replyMutation.mutate({
      complaintId: selectedComplaint._id,
      message: message.trim(),
    });
  };

  const handleStatusChange = (newStatus) => {
    if (
      !selectedComplaint?._id ||
      updateStatusMutation.isPending
    ) {
      return;
    }

    updateStatusMutation.mutate({
      complaintId: selectedComplaint._id,
      status: newStatus,
    });
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Manage Complaints
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review, filter and manage complaints
            submitted by users.
          </p>
        </div>

        {/* FILTERS */}
        <ComplaintFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={(value) => {
            setStatus(value);
            resetPage();
          }}
          priority={priority}
          setPriority={(value) => {
            setPriority(value);
            resetPage();
          }}
          category={category}
          setCategory={(value) => {
            setCategory(value);
            resetPage();
          }}
        />

        {/* TABLE */}
        <AdminComplaintTable
          complaints={complaints}
          loading={isLoading}
          onViewComplaint={setSelectedComplaint}
        />

        {/* PAGINATION */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={
                  page === 1 || isFetching
                }
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={
                  page === totalPages ||
                  isFetching
                }
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* MODAL */}
        {selectedComplaint && (
          <ComplaintDetailsModal
            complaint={selectedComplaint}
            onClose={() =>
              setSelectedComplaint(null)
            }
            updating={
              updateStatusMutation.isPending ||
              replyMutation.isPending
            }
            onStatusChange={
              handleStatusChange
            }
            onReply={handleReply}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminComplaintsPage;