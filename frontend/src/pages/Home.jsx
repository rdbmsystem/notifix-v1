import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

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

  const withPosts = posts?.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      <div className="hidden lg:block lg:col-span-1 ">
        <Sidebar user={authUser} />
      </div>

      <div
        className={`rounded-lg col-span-1 lg:col-span-2 order-first lg:order-none custom-scrollbar scroll-smooth h-[calc(100vh-120px)] ${
          withPosts ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <PostCreation user={authUser} />
        {/* <div className="rounded-lg min-h-[60vh] lg:h-[calc(100vh-120px)] max-h-[80vh]
        scroll-smooth flex flex-col overflow-y-auto custom-scrollbar"> */}
        <div>
          {withPosts > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="justify-center">
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

      {recommendedUsers?.length > 0 && (
        <div className="col-span-1  lg:col-span-1 hidden lg:block">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {recommendedUsers.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
