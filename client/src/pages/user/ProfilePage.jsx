import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  FileText,
  CheckCircle2,
  Save,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/axios";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const [isSaving, setIsSaving] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);

    // API will be connected here later
    console.log({
      name,
      email,
    });

    setTimeout(() => {
      setIsSaving(false);

      toast.success(
        "Profile updated successfully"
      );
    }, 800);
  };

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        "/auth/delete-account"
      );

      return response.data;
    },

    onSuccess: (response) => {
      // Clear authentication data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      toast.success(
        response?.message ||
          "Account deleted successfully"
      );
      navigate("/login");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete account"
      );
    },
  });

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    deleteAccountMutation.mutate();
  };

  const getInitial = () => {
    if (!name) {
      return "U";
    }

    return name
      .charAt(0)
      .toUpperCase();
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your personal information and
            account details.
          </p>
        </div>


        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">


          {/* ===================================================
              PROFILE INFORMATION
          ==================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Profile Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>


            {/* =================================================
                PROFILE HEADER
            ================================================== */}

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Avatar */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white shadow-sm">
                {getInitial()}
              </div>


              {/* User info */}

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  {name || "User"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {email}
                </p>

                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  Active account

                </div>

              </div>

            </div>


            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Full name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      py-3.5
                      pl-11
                      pr-4
                      outline-none
                      transition
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-100
                    "
                  />

                </div>

              </div>
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    disabled
                    className="
                      w-full
                      cursor-not-allowed
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3.5
                      pl-11
                      pr-4
                      text-slate-500
                      outline-none
                    "
                  />

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Email address cannot be changed here.
                </p>

              </div>
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Account role
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">

                  <ShieldCheck
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="text-sm font-medium capitalize text-slate-700">
                    {user?.role || "Citizen"}
                  </span>

                </div>

              </div>
              <div className="flex justify-end pt-3">

                <button
                  type="submit"
                  disabled={isSaving}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-orange-500
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-orange-600
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <Save size={17} />

                  {isSaving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>
          <div className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Account Overview
              </h2>

              <div className="mt-6 divide-y divide-slate-100">

                <div className="py-4 first:pt-0">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-orange-100 p-2.5">

                      <ShieldCheck
                        size={18}
                        className="text-orange-500"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Account role
                      </p>

                      <p className="mt-0.5 font-semibold capitalize text-slate-900">
                        {user?.role || "Citizen"}
                      </p>

                    </div>

                  </div>

                </div>
                <div className="py-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-green-100 p-2.5">

                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Account status
                      </p>

                      <p className="mt-0.5 font-semibold text-green-600">
                        Active
                      </p>

                    </div>

                  </div>

                </div>

                <div className="py-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-blue-100 p-2.5">

                      <FileText
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Complaints submitted
                      </p>

                      <p className="mt-0.5 font-semibold text-slate-900">
                        —
                      </p>

                    </div>

                  </div>

                </div>

                <div className="py-4 last:pb-0">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-purple-100 p-2.5">

                      <CalendarDays
                        size={18}
                        className="text-purple-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Member since
                      </p>

                      <p className="mt-0.5 font-semibold text-slate-900">
                        —
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-orange-100 p-2.5">

                  <ShieldCheck
                    size={20}
                    className="text-orange-500"
                  />

                </div>

                <div>

                  <h3 className="font-bold text-orange-700">
                    Keep your account secure
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Never share your password or
                    authentication information with
                    anyone.
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-red-100 p-2.5">

                  <Trash2
                    size={20}
                    className="text-red-600"
                  />

                </div>

                <div className="flex-1">

                  <h3 className="font-bold text-red-700">
                    Danger Zone
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-red-600">
                    Deleting your account is permanent.
                    Your account and associated data will
                    no longer be available.
                  </p>

                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={
                      deleteAccountMutation.isPending
                    }
                    className="
                      mt-5
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-300
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-600
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    <Trash2 size={17} />

                    {deleteAccountMutation.isPending
                      ? "Deleting account..."
                      : "Delete account"}

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default ProfilePage;