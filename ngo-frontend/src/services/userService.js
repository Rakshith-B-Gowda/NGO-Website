import { useAxios } from "./api";
import { useCallback } from "react";

export const useUserService = () => {
  const api = useAxios();

  const getUserProfile = useCallback(
    (userName) => api.get(`/users/${userName}`),
    [api]
  );

  const getUserById = useCallback(
    (userId) => api.get(`/users/id/${userId}`),
    [api]
  );  
  return { getUserProfile, getUserById };
};
