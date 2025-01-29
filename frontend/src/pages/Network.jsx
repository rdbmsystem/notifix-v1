import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: () => axiosInstance.get("/connections/requests"),
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => axiosInstance.get("/connections"),
  });

  return (
    <div className="relative h-full grid  xl:grid-cols-12 gap-4">
      <div className="hidden xl:block w-[18.8rem] fixed top-30  h-full z-10 ml-[-0.0rem]">
        <Sidebar user={user} />
      </div>

      <div className="xl:col-start-4 xl:col-end-13 grid gap-4  h-full">
        <div className="bg-secondary rounded-lg shadow p-6 ">
          <h1 className="text-2xl font-bold mb-6">My Network</h1>
          <h2 className="text-xl font-semibold mb-2">Connection Request</h2>
          {connectionRequests?.data?.length > 0 ? (
            <div className="mb-6">
              <div className="space-y-1">
                {connectionRequests.data.map((request) => (
                  <FriendRequest key={request.id} request={request} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg  mb-2 p-6 text-center">
              <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No connection requests
              </h3>
              <p className="text-gray-600">
                You don&apos;t have any pending connection requests at the
                moment.
              </p>
            </div>
          )}
          {connections?.data?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Connections</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {connections.data.map((connection) => (
                  <UserCard
                    key={connection._id}
                    user={connection}
                    isConnection={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-secondary rounded-lg shadow p-6 ">
          <h1 className="text-2xl font-bold mb-6">Grow your network</h1>
          {connections?.data?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                People you may know
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {connections.data.map((connection) => (
                  <UserCard
                    key={connection._id}
                    user={connection}
                    isConnection={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NetworkPage;
