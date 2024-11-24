import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { FaLock, FaUser } from "react-icons/fa";
import { InputBase } from "@mui/material";
import { MdEmail } from "react-icons/md";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation({ name, username, email, password });
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <div className="relative hover:bg-white/25 w-full rounded-full  border border-base-300">
        <div className="absolute flex items-center z-10 justify-center px-4 h-full">
          <FaUser />
        </div>
        <div className="text-inherit text-sm rounded-full bg-base-200 p-2 pl-[calc(2em+1rem)]  transition-width">
          <InputBase
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pr-8"
            required
          />
        </div>
      </div>

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

      <div className="relative hover:bg-white/25 w-full rounded-full  border border-base-300">
        <div className="absolute flex items-center z-10 justify-center px-4 h-full">
          <MdEmail />
        </div>
        <div className="text-inherit text-sm rounded-full bg-base-200 p-2 pl-[calc(2em+1rem)]  transition-width">
          <InputBase
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pr-8"
            required
          />
        </div>
      </div>

      <div className="relative hover:bg-white/25 w-full rounded-full  border border-base-300">
        <div className="absolute flex items-center z-10 justify-center px-4 h-full">
          <FaLock />
        </div>
        <div className="text-inherit text-sm rounded-full bg-base-200 p-2 pl-[calc(2em+1rem)]  transition-width">
          <InputBase
            type="password"
            placeholder="Password (6+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pr-8"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary rounded-full w-full text-white"
      >
        {isPending ? (
          <Loader className="size-5 animate-spin  btn-primary" />
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
