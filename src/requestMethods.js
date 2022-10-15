import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDIxYTdkZThlNjdmMWU4NmE3MWY0YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MzQyOTQwMCwiZXhwIjoxNjYzNjg4NjAwfQ.1SuvPQ-X0cCv8qE6GErVGmel2nndjvsmgNMn_4GOYw0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
