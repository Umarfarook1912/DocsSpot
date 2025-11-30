import client from "./client";

export const loginApi = (payload) => client.post("/auth/login", payload);
export const registerApi = (payload) => client.post("/auth/register", payload);
export const getProfileApi = () => client.get("/auth/me");
export const updateProfileApi = (payload) => client.put("/auth/me", payload);
export const deleteProfileApi = () => client.delete("/auth/me");
