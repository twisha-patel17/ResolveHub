import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UserManagement from "../../components/admin/UserManagement";

const AdminUsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Temporary mock data
  const users = [
    {
      id: "USR-001",
      name: "Twisha Patel",
      email: "twisha@example.com",
      role: "user",
      status: "Active",
      complaints: 8,
      joined: "12 Jun 2026",
    },
    {
      id: "USR-002",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "user",
      status: "Active",
      complaints: 5,
      joined: "18 Jun 2026",
    },
    {
      id: "USR-003",
      name: "Priya Mehta",
      email: "priya@example.com",
      role: "user",
      status: "Inactive",
      complaints: 3,
      joined: "22 Jun 2026",
    },
    {
      id: "USR-004",
      name: "Arjun Shah",
      email: "arjun@example.com",
      role: "user",
      status: "Active",
      complaints: 12,
      joined: "28 Jun 2026",
    },
    {
      id: "USR-005",
      name: "Neha Joshi",
      email: "neha@example.com",
      role: "user",
      status: "Active",
      complaints: 6,
      joined: "03 Jul 2026",
    },
    {
      id: "USR-006",
      name: "Aman Verma",
      email: "aman@example.com",
      role: "user",
      status: "Inactive",
      complaints: 2,
      joined: "07 Jul 2026",
    },
    {
      id: "USR-007",
      name: "Karan Patel",
      email: "karan@example.com",
      role: "user",
      status: "Active",
      complaints: 9,
      joined: "10 Jul 2026",
    },
  ];

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl">
        <UserManagement
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;