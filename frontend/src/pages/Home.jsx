import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import SuggestedUserCard from "../components/SuggestedUserCard";
import { useMemo } from "react";

const Home = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });
  const shuffleSuggestedList = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const usersToShow = useMemo(() => {
    if (!recommendedUsers || recommendedUsers.length === 0) return [];
    const shuffled = shuffleSuggestedList(recommendedUsers);
    return shuffled.slice(0, 3);
  }, [recommendedUsers]);

  const withPosts = posts?.length;

  return (
    <div className="relative h-full grid  xl:grid-cols-12 gap-4 ">
      {/* Sidebar */}
      <div className="hidden xl:block w-[18.8rem] fixed top-30  h-full z-1 ml-[-0.0rem]">
        <Sidebar user={authUser} />
      </div>

      {/* Right Sidebar */}
      {usersToShow?.length > 0 && (
        <SuggestedUserCard usersToShow={usersToShow} />
      )}

      {/* Main Content */}
      <div className="xl:col-start-4 xl:col-end-10 flex-1 h-full">
        <PostCreation user={authUser} />
        <div>
          {withPosts > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="mb-6">
                  <Users size={64} className="mx-auto text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  No Posts Yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Connect with others to start seeing posts in your feed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
