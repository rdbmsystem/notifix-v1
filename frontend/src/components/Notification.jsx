import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LuMessageSquare } from "react-icons/lu";
import { formatDistanceToNow } from "date-fns";
import { Check, MoreHorizontal, Trash2 } from "lucide-react";
import { RiUser3Line } from "react-icons/ri";
import useClickOutside from "../hooks/useOutsideClick";
import { useCallback, useRef, useState } from "react";
import Popover from "./Popover";
import { useNavigate } from "react-router-dom";

function Notification({ togglePopoverFirstLevel = null }) {
  const navigate = useNavigate();
  const [activePopover, setActivePopover] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const queryClient = useQueryClient();

  useClickOutside(dropdownRef, () => setActivePopover(null), buttonRef);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axiosInstance.get("/notifications"),
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const renderNotificationIcon = (type) => {
    const icons = {
      like: <BiLike className="text-blue-500 text-sm" />,
      comment: <LuMessageSquare className="text-green-500 text-sm" />,
      connectionAccepted: <RiUser3Line className="text-purple-500 text-sm" />,
    };
    return icons[type] || null;
  };

  const renderNotificationContent = (notification) => {
    const { type, relatedUser } = notification;

    const userLink = (
      <span
        onClick={() => navigate(`/profile/${relatedUser.username}`)}
        className="font-bold cursor-pointer "
      >
        {relatedUser.name}
      </span>
    );

    const messages = {
      like: (
        <span>
          <strong>{relatedUser.name}</strong> liked your post.
        </span>
      ),
      comment: <span>{userLink} commented on your post.</span>,
      connectionAccepted: (
        <span>{userLink} accepted your connection request.</span>
      ),
    };

    return messages[type] || null;
  };

  const togglePopup = useCallback((id) => {
    setActivePopover((prev) => (prev === id ? null : id));
  }, []);

  if (isLoading) return <p>Loading notifications...</p>;
  if (!notifications || notifications.data.length === 0)
    return <p>No notification at the moment.</p>;

  console.log(notifications.data);
  return (
    <ul ref={dropdownRef}>
      {notifications.data.map((notification) => (
        <li
          key={notification._id}
          className="bg-white rounded-lg p-2 hover:bg-base-100 transition-all group"
        >
          <div>
            <div className="flex items-center justify-between ">
              <Link
                onClick={() => {
                  markAsReadMutation.mutate(notification._id);
                  togglePopoverFirstLevel && togglePopoverFirstLevel(null);
                }}
                to={`/post/${notification?.relatedPost?._id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={
                        notification.relatedUser.profilePicture || "/avatar.png"
                      }
                      alt={notification.relatedUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-base-200 rounded-full">
                      {renderNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div>
                    <p
                      className={`text-sm ${
                        notification.read ? "text-gray-400" : ""
                      }`}
                    >
                      {renderNotificationContent(notification)}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        notification.read
                          ? "text-gray-400"
                          : "text-blue-500 font-semibold"
                      }`}
                    >
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
              {/* Third level popover here */}

              <div className="relative flex gap-2 items-center justify-center group">
                <button
                  ref={buttonRef}
                  aria-label="Toggle options"
                  onClick={() => {
                    togglePopup(notification._id);
                  }}
                  className="text-info opacity-0 group-hover:opacity-100 border border-base-300 shadow-md bg-secondary hover:text-gray-700 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-full transition-all"
                >
                  <MoreHorizontal size={16} />
                </button>
                {activePopover === notification._id && (
                  <Popover className="absolute top-12 right-[0.7rem] bg-secondary  rounded-b-lg rounded-tl-lg shadow-sides w-[14rem] p-2  z-20 ">
                    <button
                      onClick={() => {
                        togglePopup(notification._id);
                        markAsReadMutation.mutate(notification._id);
                      }}
                      className="flex items-center p-1  text-info hover:bg-base-100 w-full text-sm rounded-md transition-all "
                    >
                      <Check size={16} className="mr-2" />
                      <span>Mark as read</span>
                    </button>
                    <button
                      onClick={() => {
                        togglePopup(notification._id);
                        deleteNotificationMutation.mutate(notification._id);
                      }}
                      className="flex items-center p-1  text-info hover:bg-base-100 w-full text-sm rounded-md transition-all "
                    >
                      <Trash2 size={16} className="mr-2" />
                      <span>Delete this notification</span>
                    </button>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Notification;
