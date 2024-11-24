import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader, MessageCircle, Send, ThumbsUp, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
// import { io } from "socket.io-client";
import {
  connectSocket,
  disconnectSocket,
  emitNewComment,
  listenForComments,
} from "../services/SocketService";
import PostAction from "./PostAction";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });

const Post = ({ post }) => {
  const postId = post._id;
  // const { postId } = useParams();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes.includes(authUser._id);

  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = connectSocket();
    console.log("Socket connected:", socket.connected);
    // socket.on("receiveComment", ({ postId: updatedPostId, comment }) => {
    //   console.log("Received comment:", comment);
    //   console.log(updatedPostId, post._id);

    //   if (updatedPostId === post._id) {
    //     setComments((prev) => [...prev, comment]);
    //   }
    // });
    // console.log(post.comments);

    listenForComments((data) => {
      console.log("Received comment:", data);
      // const x = post.comments.filter((postId) => postId._id === data.postId);
      // console.log(x, "Juuu");
      if (data.postId === postId) {
        setComments((prevComments) => [
          ...prevComments,

          {
            content: data.comment,
            user: {
              _id: data.userId,
              name: data.name,
              profilePicture: data.profilePicture,
            },
            createdAt: new Date(),
          },
        ]);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [postId]);

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comment`, {
        content: newComment,
      });
    },
    onSuccess: (_, newComment) => {
      // socket.emit("newComment", { postId: post._id, comment: newComment });

      emitNewComment(
        postId,
        newComment,
        authUser._id,
        authUser.name,
        authUser.profilePicture
      );
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to add comment");
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const handleDeletePost = () => {
    // if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost();
  };

  const handleLikePost = async () => {
    if (isLikingPost) return;
    likePost();
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="bg-secondary rounded-lg shadow mt-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to={`/profile/${post?.author?.username}`}>
              <img
                src={post.author.profilePicture || "/avatar.png"}
                alt={post.author.name}
                className="size-10 rounded-full mr-3 border border-gray-300"
              />
            </Link>

            <div>
              <Link to={`/profile/${post?.author?.username}`}>
                <h3 className="font-semibold">{post.author.name}</h3>
              </Link>
              <p className="text-xs text-info">{post.author.headline}</p>
              <p className="text-xs text-info">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          {isOwner && (
            <button
              onClick={handleDeletePost}
              className="text-red-500 hover:text-red-700"
            >
              {isDeletingPost ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          )}
        </div>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full mb-4"
          />
        )}

        <div className="flex justify-between text-info">
          <PostAction
            icon={
              <ThumbsUp size={17} className={isLiked ? "text-blue-600" : ""} />
            }
            text={
              <span className={`text-[14px] ${isLiked ? "text-blue-600" : ""}`}>
                {post.likes.length === 0
                  ? "Like"
                  : post.likes.length === 1
                  ? `Like (${post.likes.length})`
                  : `Likes (${post.likes.length})`}
              </span>
            }
            onClick={handleLikePost}
          />

          <PostAction
            icon={<MessageCircle size={17} />}
            text={
              <span className="text-[14px]">Comment ({comments.length})</span>
            }
            onClick={() => setShowComments(!showComments)}
          />
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-4">
          <div className="mb-4 max-h-60 overflow-y-auto">
            {comments
              ?.filter((comment) => comment && comment.user) // Filter out null, undefined, or comments without a user
              .map((comment, i) => (
                <div
                  key={comment._id || `temp-${i}`} // Ensure a unique key
                  className="mb-2 bg-base-100 p-2 rounded flex items-start"
                >
                  <img
                    src={comment.user.profilePicture || "/avatar.png"}
                    alt={comment.user.name || "User"}
                    className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <span className="font-semibold mr-2">
                        {comment.user.name || "Unknown User"}
                      </span>
                      <span className="text-xs text-info">
                        {formatDistanceToNow(new Date(comment.createdAt))}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>

          <form onSubmit={handleAddComment} className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300"
              disabled={isAddingComment}
            >
              {isAddingComment ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Post;
