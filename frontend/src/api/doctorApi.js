import client from "./client";

export const fetchDoctorsAdminApi = () => client.get("/doctors/admin");
export const approveDoctorApi = (id) => client.put(`/doctors/${id}/approve`);
export const rejectDoctorApi = (id) => client.put(`/doctors/${id}/reject`);
export const getMyDoctorProfileApi = () => client.get("/doctors/me/profile");
export const updateMyDoctorProfileApi = (formData) => client.put("/doctors/me/profile", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const fetchDoctors = () => client.get("/doctors");

export const fetchDoctorByIdApi = (id) => client.get(`/doctors/${id}`);
