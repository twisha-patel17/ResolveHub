import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your complaints today.
        </p>
      </div>

      <Link
        to="/complaints/create"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-md"
      >
        <PlusCircle size={20} />
        New Complaint
      </Link>

    </div>
  );
};

export default DashboardHeader;