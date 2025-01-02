import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axios";
import { useQuery } from "@tanstack/react-query";
import Notifications from "./pages/Notifications";
import Network from "./pages/Network";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";

// function App() {
//   const { data: authUser, isLoading } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       try {
//         const res = await axiosInstance.get("/auth/me");
//         return res.data;
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           return null;
//         }
//         toast.error(error.response.data.message || "Something went wrong");
//       }
//     },
//   });

//   if (isLoading) return null; // you can add here loading spinner
//   return (
//     <Layout authUser={authUser}>
//       <Routes>
//         <Route
//           path="/"
//           element={authUser ? <Home /> : <Navigate to={"/login"} />}
//         />
//         <Route
//           path="/signup"
//           element={!authUser ? <Signup /> : <Navigate to={"/"} />}
//         />
//         <Route
//           path="/login"
//           element={!authUser ? <Login /> : <Navigate to={"/"} />}
//         />
//         <Route
//           path="/notifications"
//           element={authUser ? <Notifications /> : <Navigate to={"/login"} />}
//         />

//         <Route
//           path="/network"
//           element={authUser ? <Network /> : <Navigate to={"/login"} />}
//         />

//         <Route
//           path="/post/:postId"
//           element={authUser ? <Posts /> : <Navigate to={"/login"} />}
//         />
//         <Route
//           path="/profile/:username"
//           element={authUser ? <Profile /> : <Navigate to={"/login"} />}
//         />
//       </Routes>
//       <Toaster />
//     </Layout>
//   );
// }

function App() {
  const {
    data: authUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        toast.error(error.response.data.message || "Something went wrong");
        throw error;
      }
    },
  });

  if (isLoading) {
    // Show loading spinner while fetching the authUser
    return <div>Loading...</div>;
  }

  if (isError) {
    // Handle error gracefully
    return <div>Error loading user data. Please try again later.</div>;
  }

  return (
    <Layout authUser={authUser}>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <Notifications /> : <Navigate to="/login" />}
        />
        <Route
          path="/network"
          element={authUser ? <Network /> : <Navigate to="/login" />}
        />
        <Route
          path="/post/:postId"
          element={authUser ? <Posts /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
