import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import { IoNotifications, IoPeople, IoPeopleOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { BiSolidMessageRounded } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { PiSuitcaseSimple } from "react-icons/pi";
import { PiGift } from "react-icons/pi";
import { axiosInstance } from "../../lib/axios";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notif.read
  ).length;

  return (
    // <nav className="bg-secondary shadow fixed bottom-0 z-10 w-full">
    // </nav>
    <nav className="bg-secondary shadow sticky top-0 z-10">
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
                <li>
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
                </li>
                <li>
                  {/* import { IoPeople } from "react-icons/io5"; */}
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
                </li>
                <li>
                  <NavLink className="h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center">
                    <PiSuitcaseSimple size={30} />
                  </NavLink>
                </li>
                <li>
                  <NavLink className="h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center">
                    <IoVideocamOutline size={30} />
                  </NavLink>
                </li>
                <li>
                  <NavLink className="h-12 w-20 rounded-lg hover:bg-base-100 flex justify-center items-center">
                    <PiGift size={30} />
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}

          <div className="flex items-center gap-2 md:gap-3 flex-[1] justify-end">
            {authUser ? (
              <>
                <NavLink className="size-9 rounded-full hover:bg-base-300 bg-base-200 flex justify-center items-center">
                  <BiSolidGridAlt size={20} />
                </NavLink>
                <NavLink className="size-9 rounded-full hover:bg-base-300 bg-base-200 flex justify-center items-center">
                  <BiSolidMessageRounded size={20} />
                </NavLink>
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    `size-9 rounded-full hover:bg-base-300 bg-base-200 flex justify-center items-center relative ${
                      isActive ? "bg-base-300" : ""
                    } `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <IoNotifications
                        size={20}
                        className={isActive ? "text-primary" : ""}
                      />
                      {unreadNotificationCount > 0 && (
                        <span
                          className="absolute -top-1 left-5 md:right-4 bg-red-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
                        >
                          {unreadNotificationCount}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
                <img
                  src={authUser.profilePicture || "/avatar.png"}
                  alt={authUser.name}
                  className="size-10 rounded-full border border-gray-300"
                />
              </>
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
