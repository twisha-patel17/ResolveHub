import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-5 text-lg">
        Welcome, {user?.name}
      </p>
    </div>
  );
};

export default DashboardPage;