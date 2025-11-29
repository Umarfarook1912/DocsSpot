import client from "./client";

export const loginApi = (payload) => client.post("/auth/login", payload);
export const registerApi = (payload) => client.post("/auth/register", payload);
