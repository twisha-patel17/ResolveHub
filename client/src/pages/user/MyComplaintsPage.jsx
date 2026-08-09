import {
  Search,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../../layouts/DashboardLayout";
import ComplaintsTable from "../../components/complaint/ComplaintsTable";
import api from "../../lib/axios";

const MyComplaintsPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All priorities");
  const [category, setCategory] = useState("All categories");
  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;

  const tabs = [
    "All",
    "Pending",
    "In Progress",
    "Resolved",
    "Rejected",
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [activeTab, search, priority, category, sortBy]);

  const {
    data: complaints = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["complaints", "my"],

    queryFn: async () => {
      const response = await api.get("/complaints/my");

      return response.data.data;
    },
  });

  const filteredComplaints = useMemo(() => {
    let result = [...complaints];

    if (activeTab !== "All") {
      result = result.filter(
        (complaint) =>
          complaint.status === activeTab
      );
    }

    if (search.trim()) {
      const searchValue =
        search.trim().toLowerCase();

      result = result.filter((complaint) =>
        [
          complaint.title,
          complaint.description,
          complaint.complaintId,
          complaint.category,
        ]
          .filter(Boolean)
          .some((value) =>
            value
              .toLowerCase()
              .includes(searchValue)
          )
      );
    }
    if (priority !== "All priorities") {
      result = result.filter(
        (complaint) =>
          complaint.priority === priority
      );
    }

    if (category !== "All categories") {
      result = result.filter(
        (complaint) =>
          complaint.category === category
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortBy === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return result;
  }, [
    complaints,
    activeTab,
    search,
    priority,
    category,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredComplaints.length /
      complaintsPerPage
  );

  const startIndex =
    (currentPage - 1) * complaintsPerPage;

  const paginatedComplaints =
    filteredComplaints.slice(
      startIndex,
      startIndex + complaintsPerPage
    );

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const resetFilters = () => {
    setSearch("");
    setActiveTab("All");
    setPriority("All priorities");
    setCategory("All categories");
    setSortBy("newest");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              My Complaints
            </h1>

            <p className="mt-2 text-slate-500">
              {complaints.length} complaints tracked
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/complaints/create")
            }
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-orange-600 sm:w-fit"
          >
            <Plus size={20} />
            New Complaint
          </button>

        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-3 border-b border-slate-200 pb-4">

            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-orange-100 text-orange-600"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}

          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search your complaints..."
                  className="w-full rounded-2xl border border-slate-300 py-3.5 pl-14 pr-5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

              </div>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="rounded-2xl border border-slate-300 px-5 py-3.5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              >
                <option>All priorities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="rounded-2xl border border-slate-300 px-5 py-3.5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              >
                <option>All categories</option>
                <option>Road</option>
                <option>Electricity</option>
                <option>Water Supply</option>
                <option>Garbage</option>
                <option>Drainage</option>
                <option>Street Light</option>
                <option>Public Property</option>
                <option>Traffic</option>
                <option>Healthcare</option>
                <option>Other</option>
              </select>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3.5 font-medium text-slate-700 transition hover:border-orange-400 hover:bg-orange-50"
              >
                <SlidersHorizontal size={18} />
                Reset filters
              </button>

              <div className="flex w-full items-center gap-2 sm:w-auto">

                <span className="hidden whitespace-nowrap text-sm text-slate-500 xl:block">
                  Sort by
                </span>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-300 px-5 py-3.5 font-medium outline-none transition hover:border-orange-400 focus:border-orange-500 sm:w-auto"
                >
                  <option value="newest">
                    Newest first
                  </option>

                  <option value="oldest">
                    Oldest first
                  </option>
                </select>

              </div>

            </div>

          </div>

        </div>

        <ComplaintsTable
          complaints={paginatedComplaints}
          totalComplaints={
            filteredComplaints.length
          }
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

      </div>
    </DashboardLayout>
  );
};

export default MyComplaintsPage;