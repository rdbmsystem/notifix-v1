import { Link } from "react-router-dom";
import { Check, MoreHorizontal, Trash2 } from "lucide-react";
import Popover from "./Popover";
import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

function ChatList() {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });
  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/chats");
      return res.data; // Extract the data here
    },
  });

  console.log(chats);
  if (isLoading) return <p>Loading chats...</p>;
  if (!chats) return <p>No chats found.</p>;

  return (
    <ul>
      {chats?.map((chat) => (
        <li
          key={chat._id}
          className="bg-white rounded-lg p-2 hover:bg-base-100 transition-all group"
        >
          <div>
            <div className="flex items-center justify-between ">
              <Link>
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={
                        chat.participants.find(
                          (participant) => participant._id !== authUser._id
                        )?.profilePicture || "/avatar.png"
                      }
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-base-200 rounded-full"></div>
                  </div>
                  <div>
                    <p>
                      {chat.participants.find(
                        (participant) => participant._id !== authUser._id
                      )?.name || "No match"}
                    </p>
                    <p className="text-[13px]">{chat.lastMessage}</p>
                  </div>
                </div>
              </Link>
              {/* Third level popover here */}

              <div className="relative flex gap-2 items-center justify-center group">
                <button className="text-info opacity-0 group-hover:opacity-100 border border-base-300 shadow-md bg-secondary hover:text-gray-700 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-full transition-all">
                  <MoreHorizontal size={16} />
                </button>
                {/* <Popover className="absolute top-12 right-[0.7rem] bg-secondary  rounded-b-lg rounded-tl-lg shadow-sides w-[14rem] p-2  z-20 ">
                  <button className="flex items-center p-1  text-info hover:bg-base-100 w-full text-sm rounded-md transition-all ">
                    <Check size={16} className="mr-2" />
                    <span>Mark as read</span>
                  </button>
                  <button className="flex items-center p-1  text-info hover:bg-base-100 w-full text-sm rounded-md transition-all ">
                    <Trash2 size={16} className="mr-2" />
                    <span>Delete this chat</span>
                  </button>
                </Popover> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ChatList;
