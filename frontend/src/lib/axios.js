import axios from "axios";

//Development version

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

//Deployed version to production

// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.mode === "development"
//       ? "http://localhost:5000/api/v1"
//       : "/api/v1",
//   withCredentials: true,
// });

// let axiosInstance;

// if (import.meta.env.MODE === "production") {
//   axiosInstance = axios.create({
//     baseURL: "/api/v1",
//     withCredentials: true,
//   });
// } else {
//   axiosInstance = axios.create({
//     baseURL: "http://localhost:5000/api/v1",
//     withCredentials: true,
//   });
// }

// export { axiosInstance };

const createAxiosInstance = () => {
  const isProduction = import.meta.env.MODE === "production";
  return axios.create({
    baseURL: isProduction ? "/api/v1" : "http://localhost:5000/api/v1",
    withCredentials: true,
  });
};

export const axiosInstance = createAxiosInstance();
