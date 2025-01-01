import { useQuery } from "@tanstack/react-query";

import Sidebar from "../components/Sidebar";

import Notification from "../components/Notification";

const NotificationsPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="relative h-full grid  xl:grid-cols-12 gap-4">
      <div className="hidden xl:block w-[18.8rem] fixed top-30  h-full z-10 ml-[-0.0rem]">
        <Sidebar user={authUser} />
      </div>
      <div className=" xl:col-start-4 xl:col-end-13 flex-1  h-full">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>
          <Notification />
        </div>
      </div>
    </div>
  );
};
export default NotificationsPage;
