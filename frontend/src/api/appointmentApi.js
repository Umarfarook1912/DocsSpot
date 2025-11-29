import client from "./client";

export const createAppointmentApi = (payload) =>
  client.post("/appointments", payload);

export const fetchMyAppointmentsApi = () => client.get("/appointments/me");
