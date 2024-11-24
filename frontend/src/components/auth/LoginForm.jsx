import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { InputBase } from "@mui/material";
import { FaLock } from "react-icons/fa6";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="relative hover:bg-white/25 w-full rounded-full  border border-base-300">
        <div className="absolute flex items-center z-10 justify-center px-4 h-full">
          <FaUser />
        </div>
        <div className="text-inherit text-sm rounded-full bg-base-200 p-2 pl-[calc(2em+1rem)]  transition-width">
          <InputBase
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pr-8"
            required
          />
        </div>
      </div>

      <div className="relative hover:bg-white/25 w-full rounded-full border border-base-300">
        <div className="absolute flex items-center z-10 justify-center px-4 h-full">
          <FaLock />
        </div>
        <div className="text-inherit text-sm rounded-full bg-base-200 p-2 pl-[calc(2em+1rem)]  transition-width">
          <InputBase
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pr-8"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full rounded-full">
        {isPending ? (
          <Loader className="size-5 animate-spin   btn-primary" />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
