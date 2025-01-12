import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import UserCard from "./UserCard";

const SuggestedUserList = () => {
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  console.log(recommendedUsers);
  return (
    <div className="p-2 w-[50rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[80vh] overflow-y-auto will-change-scroll scroll-smooth">
      {recommendedUsers?.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default SuggestedUserList;
