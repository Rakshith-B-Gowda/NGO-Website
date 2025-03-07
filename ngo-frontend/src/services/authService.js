import api from "./api";

const authService = {
  register: (userData) => api.post("/auth/new", userData),
  login: (credentials) => api.post("/auth/authenticate", credentials),
  getRoles: (username) => api.get(`/auth/getroles/${username}`),
};

export default authService;
