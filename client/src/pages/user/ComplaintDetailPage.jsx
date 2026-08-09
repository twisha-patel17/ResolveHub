import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Shield,
} from "lucide-react";

import api from "../../lib/axios";

const ComplaintDetail = ({ complaintId }) => {
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/complaints/${complaintId}`
        );

        setComplaint(response.data.data);
      } catch (error) {
        console.error("Failed to fetch complaint:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load complaint"
        );
      } finally {
        setLoading(false);
      }
    };

    if (complaintId) {
      fetchComplaint();
    }
  }, [complaintId]);

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-slate-500">
          Loading complaint...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="font-semibold text-red-500">
            {error}
          </p>

          <button
            onClick={() => navigate("/complaints")}
            className="mt-4 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Back to complaints
          </button>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  return (
    <div className="space-y-6">

      <button
        onClick={() => navigate("/complaints")}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Back to my complaints
      </button>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-500">
            {complaint.complaintId}
          </span>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            {complaint.priority}
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {complaint.status}
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {complaint.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {complaint.category}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          Complaint details
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          {complaint.description}
        </p>

        {complaint.location && (
          <div className="mt-6 flex items-center gap-3 text-slate-600">
            <MapPin size={19} className="text-orange-500" />
            <span>{complaint.location}</span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 text-slate-600">
          <Clock3 size={19} className="text-orange-500" />
          <span>
            Created{" "}
            {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-5">
        <Shield
          size={21}
          className="mt-0.5 shrink-0 text-slate-500"
        />

        <p className="text-sm leading-6 text-slate-600">
          Your complaint information is only visible to
          authorized administrators handling this complaint.
        </p>
      </div>

    </div>
  );
};

export default ComplaintDetail;