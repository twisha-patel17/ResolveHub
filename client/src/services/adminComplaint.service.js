import api from "../lib/axios";

export const getAdminComplaints = async (filters) => {
  const response = await api.get("/complaints/admin/all", { params: filters });
  return response.data.data;
};

export const updateComplaintStatus = async ({ complaintId, status }) => {
  const response = await api.patch(`/complaints/${complaintId}/status`, { status });
  return response.data.data;
};

export const addComplaintReply = async ({ complaintId, message }) => {
  const response = await api.post(`/complaints/${complaintId}/reply`, { message });
  return response.data.data;
};