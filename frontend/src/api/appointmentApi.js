import client from "./client";

export const createAppointmentApi = (payload) =>
  client.post("/appointments", payload);

export const fetchMyAppointmentsApi = () => client.get("/appointments/me");

export const updateAppointmentStatusApi = (id, status) =>
  client.patch(`/appointments/${id}/status`, { status });
