import client from "./client";

export const fetchDoctors = () => client.get("/doctors");
