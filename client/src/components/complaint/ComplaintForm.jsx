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

    // Allow selecting the same file again
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

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

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append(
      "description",
      description.trim()
    );
    formData.append("category", category);
    formData.append("priority", priority);

    formData.append(
      "location",
      JSON.stringify({
        address: location.trim(),
      })
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    createMutation.mutate(formData);
  };

  const loading = createMutation.isPending;

  return (
    <form
      onSubmit={submitHandler}
      className="w-full"
    >
     
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          Create complaint
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:text-lg">
          Give us the details — the more specific,
          the faster it gets resolved.
        </p>
      </div>
      <div className="grid gap-5 lg:gap-6 xl:grid-cols-[minmax(0,2.3fr)_minmax(280px,1fr)]">
       
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100 sm:px-5 sm:py-4 sm:text-base"
            />
          </div>
          <div className="mt-5 sm:mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
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
              className="w-full resize-none rounded-xl border border-slate-300 p-4 text-sm leading-6 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100 sm:p-5 sm:text-base"
            />
          </div>

          <div className="mt-5 grid gap-5 sm:mt-6 md:grid-cols-2">
            
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                Category
              </label>

              <select
                value={category}
                disabled={loading}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100 sm:px-5 sm:py-4 sm:text-base"
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

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                Priority
              </label>

              <select
                value={priority}
                disabled={loading}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100 sm:px-5 sm:py-4 sm:text-base"
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

          <div className="mt-5 sm:mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Location
            </label>

            <div className="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 transition-all duration-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 sm:px-4">
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
                className="min-w-0 w-full bg-transparent px-3 py-3 text-sm outline-none disabled:bg-transparent sm:py-4 sm:text-base"
              />
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Evidence photos
            </label>

            <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              onChange={handleImageUpload}
              disabled={loading}
              className="hidden"
            />

            <label
              htmlFor="file-upload"
              className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-4 py-8 text-center transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 sm:min-h-56 sm:px-6 sm:py-10 lg:h-64"
            >
              <Upload
                size={34}
                className="text-orange-500 sm:size-10"
              />

              <p className="mt-4 text-sm font-semibold text-slate-800 sm:mt-5 sm:text-lg">
                Drag and drop images here
              </p>

              <p className="mt-1 text-sm text-slate-500">
                or{" "}
                <span className="font-semibold text-orange-500">
                  browse
                </span>
              </p>

              <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                JPG, PNG, WEBP up to 10MB each
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Maximum 5 images
              </p>
            </label>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap">
                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-20"
                  >
                    <img
                      src={URL.createObjectURL(
                        image
                      )}
                      alt={image.name}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      disabled={loading}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white transition hover:bg-red-500 disabled:cursor-not-allowed"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-100 p-4 sm:mt-8 sm:p-5">
            <Shield
              size={21}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
              Your name and contact details are only
              visible to admins handling this complaint —
              never shown to other users.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:flex sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              {loading
                ? "Submitting..."
                : "Submit complaint"}
            </button>

            <button
              type="button"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold transition hover:border-orange-400 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Save as draft
            </button>
          </div>
        </div>

        <div className="min-w-0 space-y-5 lg:space-y-6">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
            <h3 className="mb-4 text-xl font-bold text-slate-900 sm:mb-5 sm:text-2xl">
              Complaint guidelines
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CircleCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-500"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Be specific about location and time
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CircleCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-500"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Attach clear photos where possible
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CircleCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-500"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Avoid duplicate submissions
                </p>
              </div>
            </div>
          </div>

          {/* SUPPORTED FILE TYPES */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
            <h3 className="mb-4 text-xl font-bold text-slate-900 sm:mb-5 sm:text-2xl">
              Supported file types
            </h3>

            <div className="flex flex-wrap gap-2">
              {["JPG", "PNG", "WEBP"].map(
                (type) => (
                  <span
                    key={type}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 sm:px-4 sm:text-sm"
                  >
                    {type}
                  </span>
                )
              )}
            </div>

            <p className="mt-4 text-sm text-slate-500 sm:mt-5 sm:text-base">
              Max 5 files, 10MB each
            </p>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:rounded-3xl sm:p-6">
            <div className="flex items-start gap-3">
              <Clock3
                size={20}
                className="mt-0.5 shrink-0 text-orange-500"
              />

              <div className="min-w-0">
                <h3 className="font-bold text-orange-600">
                  Expected resolution time
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700 sm:mt-3 sm:text-base">
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