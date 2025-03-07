import { useAxios } from "./api";

export const useDonationService = () => {
  const api = useAxios();

  const createDonation = (donationData) => api.post("/donations", donationData);
  const getDonations = () => api.get("/donations");
  const getDonationById = (id) => api.get(`/donations/${id}`);
  const getDonationsByUser = (userId) => api.get(`/donations/user/${userId}`);

  return {
    createDonation,
    getDonations,
    getDonationById,
    getDonationsByUser,
  };
};

export default useDonationService;
