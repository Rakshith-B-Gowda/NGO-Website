import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const api = axios.create({
  baseURL: "http://localhost:8765", // API Gateway URL
});

// Create a custom hook to use the AuthContext
export const useAxios = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);

  // Request interceptor to add the token to headers
  api.interceptors.request.use(
    (config) => {
      if (authTokens) {
        config.headers["Authorization"] = `Bearer ${authTokens}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token expiration
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token might be expired
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default api;
