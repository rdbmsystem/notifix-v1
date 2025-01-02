import { Link, NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineFlag, HiOutlineUserGroup } from "react-icons/hi2";
import { IoBookmarkOutline, IoTicketOutline } from "react-icons/io5";
import { PiStorefront } from "react-icons/pi";
import React from "react";

const Sidebar = ({ user }) => {
  return (
    <div className="bg-secondary rounded-lg shadow h-[calc(100vh-110px)] flex flex-col ">
      <div className="text-center">
        <div
          className="h-16 rounded-t-lg bg-cover bg-center"
          style={{
            backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          }}
        />
        <NavLink to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mt-[-40px] object-cover border-2 border-gray-300"
          />
          <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
        </NavLink>
        <p className="text-info">{user.headline}</p>
        <p className="text-info text-xs">
          {user.connections.length} connections
        </p>
      </div>
      <div className="border-t border-base-100 mt-2 p-4">
        <ul className="text-sm  text-info flex justify-between">
          <li>Profile visitors</li>
          <span className="text-sm font-semibold text-primary">20</span>
        </ul>
        <ul className="text-sm text-info mt-2 flex justify-between">
          <li>Post engagements</li>
          <span className="text-sm font-semibold  text-primary">17</span>
        </ul>
      </div>
      <div className="border-t border-base-100 mt-2 p-4 flex-grow">
        <nav>
          <ul className="space-y-2">
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
            <li>
              <NavLink
                to=""
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
              >
                <PiStorefront className="mr-2" size={20} /> Marketplace
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
              >
                <HiOutlineUserGroup className="mr-2" size={20} /> Groups
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors"
              >
                <HiOutlineFlag className="mr-2" size={20} /> Pages
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-base-100 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link className="flex items-center py-2 px-4 rounded-md hover:bg-base-300 transition-colors">
                <IoBookmarkOutline className="mr-2" size={20} /> Saved
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
