import api from "../lib/axios";

export const createComplaint = async (complaintData) => {
  const response = await api.post(
    "/complaints",
    complaintData
  );

  return response.data;
};

export const getMyComplaints = async () => {
  const response = await api.get("/complaints/my");

  return response.data;
};

export const getComplaintById = async (id) => {
  const response = await api.get(`/complaints/${id}`);

  return response.data;
};

export const deleteComplaint = async (id) => {
  const response = await api.delete(
    `/complaints/${id}`
  );

  return response.data;
};