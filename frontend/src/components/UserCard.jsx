import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Clock,
  Loader,
  MessageCircle,
  TrashIcon,
  UserPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

function UserCard({ user }) {
  const queryClient = useQueryClient();

  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
  });

  const { mutate: sendConnectionRequest } = useMutation({
    mutationFn: (userId) =>
      axiosInstance.post(`/connections/request/${userId}`),
    onSuccess: () => {
      toast.success("Connection request sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const handleConnect = () => {
    if (connectionStatus?.data?.status === "not_connected") {
      console.log(connectionStatus?.data?.status);
      sendConnectionRequest(user._id);
    }
  };

  const renderButton = () => {
    if (isLoading) {
      return (
        <button
          className="px-4 py-2 rounded-full   flex items-center  bg-gray-200 text-gray-500   mt-2 w-full  justify-center"
          disabled
        >
          <Loader size={16} className="animate-spin mr-1" />
          Loading
        </button>
      );
    }

    switch (connectionStatus?.data?.status) {
      case "pending":
        return (
          <button
            className="px-4 py-2 rounded-full   flex items-center  bg-gray-200 text-gray-500   mt-2 w-full  justify-center"
            disabled
          >
            <Clock size={16} className="mr-1" />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex items-center justify-center gap-1 ">
            <button
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              className={`mt-2 rounded-full px-4 p-2 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white`}
            >
              <Check size={16} className="mr-1" />
              Accept
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              className={`mt-2 rounded-full  p-2 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white`}
            >
              <TrashIcon size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button
            className="mt-2 border border-primary text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors w-full flex items-center justify-center"
            disabled
          >
            <MessageCircle size={16} className="mr-1" />
            Message
          </button>
        );
      default:
        return (
          <button
            className="mt-2 border border-primary text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors w-full flex items-center justify-center"
            onClick={handleConnect}
          >
            <UserPlus size={16} className="mr-1" />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-1 flex flex-col transition-all">
      <div className="text-center">
        <div
          className="h-16 rounded-t-lg bg-cover bg-center"
          style={{
            backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          }}
        />
        <NavLink
          to={`/profile/${user.username}`}
          className="flex flex-col items-center"
        >
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mb-1 mx-auto mt-[-40px]"
          />
          <h3 className="font-semibold text-lg text-center">{user.name}</h3>
        </NavLink>
      </div>
      <div className="px-4 pb-4 ">
        <p className="text-gray-600 text-center">{user.headline}</p>
        <p className="text-[12px] text-gray-500 mt-2 text-center">
          {user.connections?.length} connections
        </p>
        {renderButton()}
      </div>
    </div>
  );
}

export default UserCard;
