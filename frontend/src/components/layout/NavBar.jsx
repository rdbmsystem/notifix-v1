import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import { IoNotifications, IoPeople, IoPeopleOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { BiSolidMessageDetail, BiSolidMessageRounded } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { PiSuitcaseSimple } from "react-icons/pi";
import { PiGift } from "react-icons/pi";
import { axiosInstance } from "../../lib/axios";
import { useRef, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import {
  MdDarkMode,
  MdLiveHelp,
  MdOutlineKeyboardArrowDown,
  MdOutlineLanguage,
} from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Check, MoreHorizontal } from "lucide-react";
import Notification from "../Notification";
import Tooltip from "../Tooltip";
import Popover from "../Popover";
import useClickOutside from "../../hooks/useOutsideClick";

const Navbar = () => {
  const queryClient = useQueryClient();
  const [activePopoverFirstLevel, setActivePopoverFirstLevel] = useState(null);
  const [activePopoverSecondLevel, setActivePopoverSecondLevel] =
    useState(null);
  const dropdownFirstLevelRef = useRef(null);
  const dropdownSecondLevelRef = useRef(null);
  const buttonSecondLevelRef = useRef(null);
  const location = useLocation();
  const isNotificationsRoute = location.pathname === "/notifications";
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  useClickOutside(dropdownFirstLevelRef, () => {
    setActivePopoverFirstLevel(false);
    setActivePopoverSecondLevel(false);
  });

  //Close dropdown "Mark all as read" when clicked outside
  useClickOutside(
    dropdownSecondLevelRef,
    () => setActivePopoverSecondLevel(false),
    buttonSecondLevelRef
  );

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setActivePopoverFirstLevel(null);
    },
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notif.read
  ).length;

  const togglePopoverFirstLevel = (popover) => {
    setActivePopoverFirstLevel((prev) => (prev === popover ? null : popover));
  };

  const togglePopoverSecondLevel = () => {
    setActivePopoverSecondLevel(!activePopoverSecondLevel);
  };

  return (
    <nav className="bg-secondary shadow sticky top-0 z-30">
      <div className="px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-3 flex-[1]">
            <Link to="/">
              <img
                className="h-12 rounded-full"
                src="/logo-v1.png"
                alt="notifix"
              />
            </Link>
            <div className="ml-4">{authUser ? <SearchBar /> : null}</div>
          </div>
          {authUser ? (
            <div className="flex items-center flex-none">
              <ul className="flex items-center gap-3 text-gray-600">
                <li className="relative group transition-all">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center ${
                        isActive ? "bg-base-100" : ""
                      }`
                    }
                  >
                    {({ isActive }) =>
                      isActive ? (
                        <HiHome size={30} className="text-primary" />
                      ) : (
                        <HiOutlineHome size={30} />
                      )
                    }
                  </NavLink>
                  <span className="top-[2.6rem] left-10 absolute">
                    <Tooltip description="Home" />
                  </span>
                </li>
                <li className="relative group transition-all">
                  <NavLink
                    to="/network"
                    className={({ isActive }) =>
                      `h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center ${
                        isActive ? "bg-base-100" : ""
                      }`
                    }
                  >
                    {({ isActive }) =>
                      isActive ? (
                        <IoPeople size={30} className="text-primary" />
                      ) : (
                        <IoPeopleOutline size={30} />
                      )
                    }
                  </NavLink>
                  <span className="top-[2.6rem] left-10 absolute">
                    <Tooltip description="Network" />
                  </span>
                </li>
                <li className="relative group transition-all">
                  <NavLink className="h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center">
                    <PiSuitcaseSimple size={30} />
                  </NavLink>
                  <span className="top-[2.6rem] left-10 absolute">
                    <Tooltip description="Community" />
                  </span>
                </li>
                <li className="relative group transition-all">
                  <NavLink className="h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center">
                    <IoVideocamOutline size={30} />
                  </NavLink>
                  <span className="top-[2.6rem] left-10 absolute">
                    <Tooltip description="Videos" />
                  </span>
                </li>
                <li className="relative group transition-all">
                  <NavLink className="h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center">
                    <PiGift size={30} />
                  </NavLink>
                  <span className="top-[2.6rem] left-10 absolute">
                    <Tooltip description="Gifts" />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
          <div className="flex items-center  gap-2 md:gap-3 flex-[1] justify-end">
            {authUser ? (
              <div
                ref={dropdownFirstLevelRef}
                className="flex items-center gap-2 md:gap-3"
              >
                <div className="relative">
                  <NavLink
                    onClick={() => togglePopoverFirstLevel("Applications")}
                    to="/applications"
                    className={({ isActive }) =>
                      `size-9 rounded-full hover:bg-base-300 bg-base-200 flex justify-center items-center relative group transition-all ${
                        isActive ? "bg-base-300" : ""
                      } `
                    }
                  >
                    <BiSolidGridAlt size={20} />
                    <Tooltip description="Applications" />
                  </NavLink>
                  {activePopoverFirstLevel === "Applications" && (
                    <div className="absolute -right-[148px] top-[42px] bg-secondary rounded-b-lg rounded-tl-lg shadow-sides w-[18rem] h-[40rem]   z-10"></div>
                  )}
                </div>
                <div className="relative">
                  <NavLink
                    onClick={() => togglePopoverFirstLevel("Messages")}
                    to="/messages"
                    className={({ isActive }) =>
                      `size-9 rounded-full hover:bg-base-300 bg-base-200 flex justify-center items-center relative group transition-all ${
                        isActive ? "bg-base-300" : ""
                      } `
                    }
                  >
                    <BiSolidMessageRounded size={20} />
                    <Tooltip description="Messages" />
                  </NavLink>
                  {activePopoverFirstLevel === "Messages" && (
                    <div className="absolute -right-[100px] top-[42px] bg-secondary rounded-b-lg rounded-tl-lg shadow-sides w-[18rem] h-[40rem]   z-10"></div>
                  )}
                </div>
                <div className="relative">
                  <NavLink
                    onClick={() => togglePopoverFirstLevel("Notifications")}
                    className={`size-9 rounded-full hover:bg-base-300 bg-base-200 flex justify-center items-center relative group transition-all ${
                      activePopoverFirstLevel === "Notifications" ||
                      isNotificationsRoute
                        ? "bg-green-100 hover:bg-green-200"
                        : ""
                    }`}
                  >
                    <IoNotifications
                      size={20}
                      className={
                        activePopoverFirstLevel === "Notifications" ||
                        isNotificationsRoute
                          ? "text-primary"
                          : ""
                      }
                    />
                    {unreadNotificationCount > 0 && (
                      <span
                        className="absolute -top-1 left-5 md:right-4 bg-red-500 text-white text-[10px]
                            rounded-full size-4 md:size-4 flex items-center justify-center"
                      >
                        {unreadNotificationCount}
                      </span>
                    )}
                    <Tooltip description="Notifications" />
                  </NavLink>
                  {activePopoverFirstLevel === "Notifications" && (
                    <Popover className="absolute -right-[52px] top-[42px] bg-secondary rounded-b-lg rounded-tl-lg shadow-sides w-[18rem] h-[40rem] z-10 flex flex-col">
                      <div className="relative flex flex-row justify-between p-2 items-center">
                        <h1 className="font-semibold text-xl">Notifications</h1>
                        {/* Mark all as read */}
                        <div ref={dropdownSecondLevelRef}>
                          <button
                            ref={buttonSecondLevelRef}
                            onClick={togglePopoverSecondLevel}
                            className="text-info hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {activePopoverSecondLevel && (
                            <Popover className="absolute right-4 bg-secondary  rounded-b-lg rounded-tl-lg shadow-sides w-[13rem] p-2  z-20 ">
                              <button
                                onClick={() => console.log("Mark all as read")}
                                className="flex items-center p-1  text-info hover:bg-base-100 w-full text-sm rounded-md transition-all "
                              >
                                <Check size={16} className="mr-2" />
                                <span>Mark all as read</span>
                              </button>
                            </Popover>
                          )}
                        </div>
                        {/* Mark all as read */}
                      </div>
                      <div className="border-b"></div>

                      {/* Third level popover here */}
                      <div className="flex flex-col overflow-auto h-[35rem] px-1 pt-1">
                        <Notification />
                      </div>
                      {/* Third level popover here */}

                      <NavLink to="/notifications">
                        <div
                          onClick={() => setActivePopoverFirstLevel(null)}
                          className="flex items-center m-1 justify-center flex-grow"
                        >
                          <span className="items-center justify-center p-1 flex text-info text-sm bg-gray-100 hover:bg-gray-200 hover:text-gray-700 rounded-md w-full transition-all">
                            See all notifications
                          </span>
                        </div>
                      </NavLink>
                    </Popover>
                  )}
                </div>
                <div className="relative ">
                  <div className="relative group transition-all">
                    <button
                      onClick={() => togglePopoverFirstLevel("Profile")}
                      className="relative  flex items-center justify-center size-10 rounded-full  bg-transparent active:scale-95 "
                    >
                      <img
                        src={authUser.profilePicture || "/avatar.png"}
                        alt={authUser.name}
                        className="absolute w-full h-full rounded-full object-cover transition-transform hover:brightness-95 "
                      />
                      <span className="absolute -right-1 top-6 bg-base-200 text-base-500 text-xs rounded-full flex items-center justify-center size-4 border-2 border-gray-300">
                        <MdOutlineKeyboardArrowDown size={16} />
                      </span>
                    </button>
                    <span className="top-[2.4rem] left-6 absolute">
                      <Tooltip description="Account" />
                    </span>
                  </div>

                  {activePopoverFirstLevel === "Profile" && (
                    <Popover className="absolute right-0 top-11 bg-secondary   rounded-b-lg rounded-tl-lg shadow-sides w-[18rem] h-[23.3rem]   z-10">
                      <div className="flex flex-row p-2 ">
                        <img
                          src={authUser.profilePicture || "/avatar.png"}
                          alt={authUser.name}
                          className="h-[3.5rem] w-[3.5rem]  rounded-full mr-3 object-cover"
                        />
                        <div className="flex flex-col items-start">
                          <div className="text-lg font-semibold">
                            {authUser.name}
                          </div>
                          <p className="text-xs text-info ">
                            Software Engineer
                          </p>
                        </div>
                      </div>
                      <div className="px-2">
                        <NavLink
                          to={`/profile/${authUser.username}`}
                          className="text-sm text-info flex items-center space-x-2 mb-1"
                        >
                          <button
                            onClick={() => setActivePopoverFirstLevel(null)}
                            className="border border-primary rounded-full w-full px-4 py-1 text-primary text-sm hover:bg-primary hover:text-white"
                          >
                            View profile
                          </button>
                        </NavLink>
                      </div>
                      <div className="border-b mt-2"></div>
                      <div className="flex flex-col px-3">
                        <h1 className="py-2 font-semibold text-md">Account</h1>
                        <Link
                          to="/settings"
                          className="text-sm text-info flex items-center space-x-2 mb-1 "
                        >
                          <IoMdSettings
                            size={16}
                            className="flex-shrink-0 border-2 border-gray-200 bg-gray-200 rounded-full size-6 p-1 "
                          />
                          <span className="leading-none ">
                            Settings & privacy
                          </span>
                        </Link>
                        <Link
                          to="/help"
                          className="text-sm text-info flex items-center space-x-2 mb-1"
                        >
                          <MdLiveHelp
                            size={16}
                            className="flex-shrink-0 border-2 border-gray-200 bg-gray-200 rounded-full size-6 p-1 "
                          />
                          <span className="leading-none ">Help</span>
                        </Link>
                        <Link
                          to="/language"
                          className="text-sm text-info flex items-center space-x-2 mb-1"
                        >
                          <MdOutlineLanguage
                            size={16}
                            className="flex-shrink-0 border-2 border-gray-200 bg-gray-200 rounded-full size-6 p-1 "
                          />
                          <span className="leading-none ">Language</span>
                        </Link>
                      </div>
                      <div className="border-b mt-2"></div>
                      <div className="flex flex-col px-3">
                        <h1 className="py-2 font-semibold text-md">Manage</h1>
                        <Link
                          to="/settings"
                          className="text-sm text-info flex items-center space-x-2 mb-1 "
                        >
                          <BiSolidMessageDetail
                            size={16}
                            className="flex-shrink-0 border-2 border-gray-200 bg-gray-200 rounded-full size-6 p-1 "
                          />
                          <span className="leading-none ">Post & activity</span>
                        </Link>
                        <Link
                          to="/help"
                          className="text-sm text-info flex items-center space-x-2 mb-1"
                        >
                          <MdDarkMode
                            size={16}
                            className="flex-shrink-0 border-2 border-gray-200 bg-gray-200 rounded-full size-6 p-1 "
                          />
                          <span className="leading-none ">
                            Display & accessibility
                          </span>
                        </Link>
                        <Link
                          onClick={logout}
                          className="text-sm text-info flex items-center space-x-2 mb-1"
                        >
                          <RiLogoutBoxRFill
                            size={16}
                            className="flex-shrink-0 border-2 border-gray-200 bg-gray-200 rounded-full size-6 p-1 "
                          />
                          <span className="leading-none ">Logout</span>
                        </Link>
                      </div>
                    </Popover>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link className="btn btn-ghost">Create a ticket</Link>
                <Link to="/login" className="btn btn-ghost">
                  Sign in
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
