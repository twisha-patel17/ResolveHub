import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AdminLayout from "../../layouts/AdminLayout";
import ComplaintFilters from "../../components/admin/ComplaintFilters";
import AdminComplaintTable from "../../components/admin/AdminComplaintTable";

import api from "../../lib/axios";
import toast from "react-hot-toast";

const fetchComplaints = async ({ queryKey }) => {
  const [, filters] = queryKey;

  const response = await api.get("/complaints/admin/all", {
    params: filters,
  });

  return response.data.data;
};

const AdminComplaintsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filters = {
    page,
    limit: 10,
    ...(search.trim() && { search: search.trim() }),
    ...(status !== "All" && { status }),
    ...(priority !== "All" && { priority }),
    ...(category !== "All" && { category }),
  };

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["admin-complaints", filters],
    queryFn: fetchComplaints,
    placeholderData: (previousData) => previousData,
  });

  if (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to load complaints"
    );
  }

  const complaints = data?.complaints || [];
  const totalPages = data?.totalPages || 1;

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Manage Complaints
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review, filter and manage complaints submitted by users.
          </p>
        </div>

        {/* Filters */}
        <ComplaintFilters
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          status={status}
          setStatus={(value) => {
            setStatus(value);
            setPage(1);
          }}
          priority={priority}
          setPriority={(value) => {
            setPriority(value);
            setPage(1);
          }}
          category={category}
          setCategory={(value) => {
            setCategory(value);
            setPage(1);
          }}
        />

        {/* Table */}
        <AdminComplaintTable
          complaints={complaints}
          loading={isLoading}
        />

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">

            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={page === 1 || isFetching}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={page === totalPages || isFetching}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminComplaintsPage;