import AdminLoginForm from "../../components/auth/AdminLoginForm";

const AdminLoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e2a3d] px-4 py-8 sm:px-6">
      <div className="w-full max-w-100 rounded-[22px] bg-white p-6 shadow-xl sm:p-7">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;