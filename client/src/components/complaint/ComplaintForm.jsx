import {
  Upload,
  MapPin,
  Shield,
  Clock3,
  CircleCheck,
  X,
} from "lucide-react";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createComplaint } from "../../services/complaint.service";

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

  // =========================
  // IMAGE SELECTION
  // =========================

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      const maxSize = 10 * 1024 * 1024;

      return (
        validTypes.includes(file.type) &&
        file.size <= maxSize
      );
    });

    if (validFiles.length !== files.length) {
      toast.error(
        "Only JPG, PNG or WEBP images up to 10MB are allowed."
      );
    }

    setImages((prev) =>
      [...prev, ...validFiles].slice(0, 5)
    );
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // CREATE COMPLAINT MUTATION
  // =========================

  const createMutation = useMutation({
    mutationFn: createComplaint,

    onSuccess: (response) => {
      toast.success(
        response.message ||
          "Complaint submitted successfully"
      );

      navigate("/complaints");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create complaint"
      );
    },
  });

  // =========================
  // SUBMIT
  // =========================

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Complaint title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Complaint description is required");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!priority) {
      toast.error("Please select a priority");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return;
    }

    const complaintData = {
      title: title.trim(),

      description: description.trim(),

      category,

      priority,

      location: {
        address: location.trim(),
      },

      // Images will be handled separately
      images: [],
    };

    createMutation.mutate(complaintData);
  };

  const loading = createMutation.isPending;

  return (
    <form onSubmit={submitHandler}>
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Create complaint
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Give us the details — the more specific,
          the faster it gets resolved.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[2.3fr_1fr]">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* TITLE */}

          <div>
            <label className="mb-2 block font-semibold text-slate-800">
              Complaint title
            </label>

            <input
              type="text"
              value={title}
              disabled={loading}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Leaking pipe near main entrance"
              className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-slate-800">
              Description
            </label>

            <textarea
              rows={6}
              value={description}
              disabled={loading}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe what happened, where, and when..."
              className="w-full resize-none rounded-xl border border-slate-300 p-5 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
            />
          </div>

          {/* CATEGORY + PRIORITY */}

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Category
              </label>

              <select
                value={category}
                disabled={loading}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
              >
                <option value="">
                  Select category
                </option>

                <option value="Road">
                  Road
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Water Supply">
                  Water Supply
                </option>

                <option value="Garbage">
                  Garbage
                </option>

                <option value="Drainage">
                  Drainage
                </option>

                <option value="Street Light">
                  Street Light
                </option>

                <option value="Public Property">
                  Public Property
                </option>

                <option value="Traffic">
                  Traffic
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Priority
              </label>

              <select
                value={priority}
                disabled={loading}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
              >
                <option value="">
                  Select priority
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

                <option value="Urgent">
                  Urgent
                </option>
              </select>
            </div>

          </div>

          {/* LOCATION */}

          <div className="mt-6">

            <label className="mb-2 block font-semibold">
              Location
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 transition-all duration-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">

              <MapPin
                size={18}
                className="shrink-0 text-slate-400"
              />

              <input
                value={location}
                disabled={loading}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                type="text"
                placeholder="Block, floor, or landmark"
                className="w-full bg-transparent px-3 py-4 outline-none disabled:bg-transparent"
              />

            </div>

          </div>

          {/* IMAGES */}

          <div className="mt-6">

            <label className="mb-2 block font-semibold">
              Evidence photos
            </label>

            <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            <label
              htmlFor="file-upload"
              className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition-all duration-300 hover:border-orange-500 hover:bg-orange-50"
            >
              <Upload
                size={42}
                className="text-orange-500"
              />

              <p className="mt-5 text-lg font-semibold">
                Drag and drop images here
              </p>

              <p className="text-slate-500">
                or

                <span className="ml-1 font-semibold text-orange-500">
                  browse
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-400">
                JPG, PNG, WEBP up to 10MB each
              </p>
            </label>

            {images.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">

                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative h-20 w-20 overflow-hidden rounded-xl bg-slate-100"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="absolute right-1 top-1 rounded-full bg-slate-700 p-1 text-white transition hover:bg-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* PRIVACY */}

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-100 p-5">

            <Shield
              size={22}
              className="shrink-0 text-slate-500"
            />

            <p className="text-sm text-slate-600">
              Your name and contact details are only
              visible to admins handling this complaint —
              never shown to other users.
            </p>

          </div>

          {/* BUTTONS */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {loading
                ? "Submitting..."
                : "Submit complaint"}
            </button>

            <button
              type="button"
              disabled={loading}
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:border-orange-400 hover:bg-orange-50"
            >
              Save as draft
            </button>

          </div>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="space-y-6">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-2xl font-bold">
              Complaint guidelines
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <CircleCheck className="shrink-0 text-green-500" />

                <p>
                  Be specific about location and time
                </p>
              </div>

              <div className="flex gap-3">
                <CircleCheck className="shrink-0 text-green-500" />

                <p>
                  Attach clear photos where possible
                </p>
              </div>

              <div className="flex gap-3">
                <CircleCheck className="shrink-0 text-green-500" />

                <p>
                  Avoid duplicate submissions
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-2xl font-bold">
              Supported file types
            </h3>

            <div className="flex gap-3">

              {["JPG", "PNG", "WEBP"].map(
                (type) => (
                  <span
                    key={type}
                    className="rounded-lg bg-slate-100 px-4 py-2 text-sm"
                  >
                    {type}
                  </span>
                )
              )}

            </div>

            <p className="mt-5 text-lg">
              Max 5 files, 10MB each
            </p>

          </div>

          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">

            <div className="flex items-start gap-3">

              <Clock3 className="mt-1 shrink-0 text-orange-500" />

              <div>

                <h3 className="font-bold text-orange-600">
                  Expected resolution time
                </h3>

                <p className="mt-3 text-slate-700">
                  Medium-priority complaints are
                  typically resolved within{" "}

                  <span className="font-semibold">
                    48–72 hours
                  </span>
                  .
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </form>
  );
};

export default ComplaintForm;