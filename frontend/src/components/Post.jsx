import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Loader,
  MessageCircle,
  MoreVertical,
  PencilIcon,
  SendHorizonal,
  Share2,
  ThumbsUp,
  Trash,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  connectSocket,
  disconnectSocket,
  emitNewComment,
  listenForComments,
} from "../services/SocketService";
import PostAction from "./PostAction";
import Popover from "./Popover";
import useClickOutside from "../hooks/useOutsideClick";

const Post = ({ post }) => {
  const postId = post._id;
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes.includes(authUser._id);
  const [showFullContent, setShowFullContent] = useState(false);
  const [activePopover, setActivePopover] = useState(false);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  useClickOutside(dropdownRef, () => setActivePopover(false));

  useEffect(() => {
    const socket = connectSocket();
    console.log("Socket connected:", socket.connected);

    listenForComments((data) => {
      if (data.postId === postId) {
        setComments((prevComments) => [
          ...prevComments,
          {
            content: data.comment,
            user: {
              _id: data.userId,
              name: data.name,
              profilePicture: data.profilePicture,
              headline: data.headline,
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
      emitNewComment(
        postId,
        newComment,
        authUser._id,
        authUser.name,
        authUser.profilePicture,
        authUser.headline
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
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const togglePopover = () => {
    setActivePopover(!activePopover);
  };
  const handleDeletePost = () => {
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
  const contentPreview =
    post.content && post.content.length > 200 && !showFullContent
      ? `${post.content.slice(0, 200)}...`
      : post.content || "";

  return (
    <div className="bg-secondary rounded-lg shadow mb-4">
      <div className="pt-4 px-4 ">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to={`/profile/${post?.author?.username}`}>
              <img
                src={post.author.profilePicture || "/avatar.png"}
                alt={post.author.name}
                className="size-10 rounded-full mr-3 border object-cover border-gray-300"
              />
            </Link>
            <div>
              <div className="flex flex-col sm:flex-row  items-center">
                <Link to={`/profile/${post?.author?.username}`}>
                  <h3 className="font-semibold">{post.author.name}</h3>
                </Link>
                <span className="mx-2 text-info hidden sm:inline">•</span>
                <p className="text-xs text-info">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <p className="text-xs text-info">{post.author.headline}</p>
            </div>
          </div>
          {isOwner && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={togglePopover}
                className="text-info hover:text-gray-700 hover:bg-gray-200  p-2 rounded-full"
              >
                <MoreVertical size={18} />
              </button>
              {activePopover && (
                <Popover className="absolute right-4 bg-secondary  rounded-b-lg rounded-tl-lg shadow-sides w-[12rem] p-2  z-20 ">
                  <button className="flex items-center p-1  text-info hover:bg-base-100 w-full text-sm rounded-md transition-all ">
                    <PencilIcon size={16} className="mr-2" />
                    <span>Edit post</span>
                  </button>
                  <button className="flex items-center  p-1  text-info hover:bg-base-100 w-full text-sm rounded-md  transition-all">
                    <Bookmark size={16} className="mr-2" />
                    <span>Save post</span>
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="flex items-center  p-1  text-info hover:bg-base-100 w-full text-sm rounded-md  transition-all"
                  >
                    {isDeletingPost ? (
                      <Loader size={16} className="animate-spin mr-2" />
                    ) : (
                      <Trash size={16} className="mr-2" />
                    )}
                    <span>Move to trash</span>
                  </button>
                </Popover>
              )}
            </div>
          )}
        </div>
        <div className="w-full overflow-hidden">
          <p className="mb-4 break-words">
            {contentPreview}
            {post.content && post.content.length > 200 && (
              <span
                className="text-gray-500 cursor-pointer"
                onClick={toggleContent}
              >
                {showFullContent ? " Show less" : " Show more"}
              </span>
            )}
          </p>
        </div>
      </div>
      {post.image && (
        <div className="relative w-full">
          <div className="absolute inset-0 bg-cover bg-center bg-base-200 z-0 "></div>
          <img
            src={post.image}
            alt="Post content"
            className="relative object-cover mx-auto   "
          />
        </div>
      )}

      <div className="pt-4 px-4 mb-2 ">
        <div
          className={
            showComments
              ? "flex justify-between text-info py-1  border-gray-300 border-y"
              : "flex justify-between text-info py-1 border-gray-300 border-t"
          }
        >
          <PostAction
            icon={
              <ThumbsUp size={17} className={isLiked ? "text-blue-600" : ""} />
            }
            text={
              <span
                className={`text-[14px]  ${isLiked ? "text-blue-600" : ""}`}
              >
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
              <span className="text-[14px]">
                {comments.length === 0
                  ? "Comment"
                  : comments.length === 1
                  ? `Comment (${comments.length})`
                  : `Comments (${comments.length})`}
              </span>
            }
            onClick={() => setShowComments(!showComments)}
          />

          <PostAction
            icon={<Share2 size={17} />}
            text={<span className="text-[14px] ">Share</span>}
          />
        </div>
      </div>

      {showComments && (
        <div className="pb-4 px-4">
          <div className="max-h-60 overflow-y-auto will-change-scroll scroll-smooth">
            {comments
              ?.filter((comment) => comment && comment.user)
              .map((comment, i) => (
                <div
                  key={comment._id || `temp-${i}`}
                  className=" p-2 rounded flex items-start"
                >
                  <Link to={`/profile/${comment?.user?.username}`}>
                    <img
                      src={comment.user.profilePicture || "/avatar.png"}
                      alt={comment.user.name || "User"}
                      className="w-9 h-9 border rounded-full mr-1 flex-shrink-0 object-cover"
                    />
                  </Link>
                  <div className="inline-block  bg-gray-100 px-5 py-1 rounded-[20px] break-words overflow-hidden ">
                    <div className="flex items-center">
                      <Link to={`/profile/${comment?.user?.username}`}>
                        <span className="font-semibold text-sm">
                          {comment.user.name || "Unknown User"}
                        </span>
                      </Link>
                      <span className="mx-2 text-info hidden sm:inline">•</span>
                      <span className="text-xs text-info">
                        {formatDistanceToNow(new Date(comment.createdAt))}
                      </span>
                    </div>
                    <p className="text-xs text-info">{comment.user.headline}</p>
                    <p className="break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <form
            onSubmit={handleAddComment}
            className="relative flex items-center pt-2 gap-x-1"
          >
            <img
              src={authUser.profilePicture || "/avatar.png"}
              alt={"user.name"}
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
            <input
              autoFocus
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="rounded-full block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-12"
            />
            <button
              type="submit"
              className={`absolute right-2 transition duration-300  ${
                newComment.trim()
                  ? "text-primary  hover:text-primary-dark"
                  : " text-gray-300"
              }`}
              disabled={!newComment.trim() || isAddingComment}
            >
              {isAddingComment ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <SendHorizonal size={18} />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Post;
