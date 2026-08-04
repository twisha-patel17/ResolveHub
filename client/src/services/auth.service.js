import api from "../lib/axios";

export const loginUser = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
}

export const getCurrentUser = async () => {
  const response = await api.get("/me");
  return response.data;
}