import { Link, NavLink } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

export default function Sidebar({ user }) {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return (
    <div className="bg-secondary rounded-lg shadow h-[calc(100vh-120px)] flex flex-col overflow-y-auto custom-scrollbar">
      <div className="p-4 text-center ">
        <div
          className="h-16 rounded-t-lg bg-cover bg-center "
          style={{
            backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          }}
        />
        <NavLink to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mt-[-40px] border-2 border-gray-300"
          />
          <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
        </NavLink>
        <p className="text-info">{user.headline}</p>
        <p className="text-info text-xs">
          {user.connections.length} connections
        </p>
      </div>
      <div className="border-t border-base-100 p-4 flex-grow">
        <nav>
          <ul className="space-y-2">
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition-colors ${
                    isActive ? "bg-primary text-white" : "hover:bg-base-300 "
                  }`
                }
              >
                <FaHome className="mr-2" size={20} /> Home
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/network"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition-colors ${
                    isActive ? "bg-primary text-white" : "hover:bg-base-300"
                  }`
                }
              >
                <BsFillPeopleFill className="mr-2" size={20} /> My Network
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition-colors ${
                    isActive ? "bg-primary text-white" : "hover:bg-base-300 "
                  }`
                }
              >
                <IoNotifications className="mr-2" size={20} /> Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
              >
                <BiSolidMessage className="mr-2" size={20} /> Messages
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to=""
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
              >
                <AiOutlineDashboard className="mr-2" size={20} /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
              >
                <IoTicketOutline className="mr-2" size={20} /> Tickets
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-base-100 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
                onClick={logout}
              >
                <TbLogout className="mr-2" size={20} /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
