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
    <div className="relative h-full grid  xl:grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="hidden xl:block w-[18.8rem] fixed top-30  h-full z-1 ml-[-0.0rem]">
        <Sidebar user={authUser} />
      </div>

      {/* Right Sidebar */}
      {recommendedUsers?.length > 0 && (
        <div className="hidden xl:block w-[18.8rem] fixed top-30   h-full z-1 ml-[59.2rem] space-y-4 ">
          <div className="bg-secondary rounded-lg shadow p-3 ">
            <h2 className="font-semibold mb-2">Add to your network</h2>
            {recommendedUsers.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
          <div
            className="bg-secondary rounded-lg shadow p-4 h-40 bg-cover bg-center"
            style={{
              backgroundImage: "url('/itsupport.jpg')",
              opacity: 0.8,
            }}
          >
            <h1 className="inline-flex flex-col space-y-1">
              <span className="bg-accent font-semibold px-2 inline w-max text-lg">
                See available IT Support
              </span>
              <span className="bg-accent px-2 inline w-max text-lg">
                on Notifix.
              </span>
            </h1>
          </div>
          <div className="px-2 ">
            <div className="break-words  inline-block space-x-2 ">
              <span className="text-slate-400 pt-1 text-[13px] inline-block ml-2">
                About
              </span>
              <span className="text-slate-400 pt-1 text-[13px] inline-block">
                Business
              </span>
              <span className="text-slate-400 pt-1 text-[13px]">Careers</span>
              <span className="text-slate-400 pt-1 text-[13px]">
                Documentations
              </span>
              <span className="text-slate-400 pt-1 text-[13px] inline-block">
                Help center
              </span>
              <span className="text-slate-400 pt-1 text-[13px] inline-block">
                Privacy & terms
              </span>
            </div>
            <p className="text-slate-400 pt-1 ml-2 text-[13px]">
              Copyright &copy; 2024 by Rain Kun. All rights reserved.
            </p>
          </div>
        </div>
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
