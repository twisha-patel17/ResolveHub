import api from "../lib/axios";

export const loginAdmin = async (data) => {
  const response = await api.post("/auth/admin/login", data);

  return response.data;
};