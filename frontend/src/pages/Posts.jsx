import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const Posts = () => {
  const { postId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => axiosInstance.get(`/posts/${postId}`),
  });

  if (isLoading) return <div>Loading post...</div>;
  if (!post?.data) return <div>Post not found</div>;

  return (
    <div className="relative h-full grid  xl:grid-cols-12 gap-4">
      <div className="hidden xl:block w-[18.8rem] fixed top-30  h-full z-10 ml-[-0.0rem]">
        <Sidebar user={authUser} />
      </div>
      <div className=" xl:col-start-4 xl:col-end-13 flex-1  h-full ">
        <Post post={post.data} />
      </div>
    </div>
  );
};
export default Posts;
