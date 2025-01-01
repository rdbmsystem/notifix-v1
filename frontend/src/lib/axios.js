import axios from "axios";

//Development version

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

//Deployed version to production

export const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development"
      ? "http://localhost:5000/api/v1"
      : "/api/v1",
  withCredentials: true,
});
