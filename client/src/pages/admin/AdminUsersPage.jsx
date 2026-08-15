import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../layouts/AdminLayout";
import UserManagement from "../../components/admin/UserManagement";
import api from "../../lib/axios";

const AdminUsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: async () => {
      const res = await api.get(
        `/admin/users?page=${page}&limit=${limit}`
      );

      return res.data.data;
    },
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex min-h-100 items-center justify-center text-slate-500">
          Loading users...
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="flex min-h-100 items-center justify-center text-red-500">
          Failed to load users.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl">
        <UserManagement
          users={data?.users || []}
          pagination={data?.pagination}
          page={page}
          setPage={setPage}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;