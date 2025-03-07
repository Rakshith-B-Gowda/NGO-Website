import { useAxios } from "./api";
import { useCallback } from "react";

export const useEventService = () => {
  const api = useAxios();

  const addEvent = useCallback(
    (eventData) => api.post("/events", eventData),
    [api]
  );

  const getAllEvents = useCallback(
    () => api.get("/events"),
    [api]
  );

  const getEventById = useCallback(
    (eventId) => api.get(`/events/${eventId}`),
    [api]
  );

  const updateEvent = useCallback(
    (eventId, eventData) => api.put(`/events/${eventId}`, eventData),
    [api]
  );

  const deleteEvent = useCallback(
    (eventId) => api.delete(`/events/${eventId}`),
    [api]
  );

  return { addEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
};
