import { X } from "lucide-react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ChatProvider } from "../../context/ChatContext.jsx";
import useChat from "../../hooks/useChat.js";

export const Layout = ({ authUser, children }) => {
  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col">
        <div className="bg-base-100 flex-1 relative">
          <NavBar />
          <main className="max-w-7xl mx-auto px-4 py-20">
            {children}
            <Chatbox />
            {/* <div className="fixed bottom-0 right-4 z-20 bg-secondary w-[22rem] h-[28rem] shadow-sides rounded-t-lg">
              <div className="relative flex flex-row justify-between p-2 items-center">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/avatar.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-md leading-none">
                      Rain Kun
                    </h1>
                    <span className="text-sm text-gray-500">Active now</span>
                  </div>
                </div>
                <div>
                  <button className="text-primary" onClick={closeChatbox}>
                    <X size={25} />
                  </button>
                </div>
              </div>
            </div> */}
          </main>
        </div>
        <div className="border border-t-base-200">
          {!authUser ? <Footer /> : null}
        </div>
      </div>
    </ChatProvider>
  );
};

const Chatbox = () => {
  const { isChatboxOpen, chatUser, closeChatbox } = useChat();
  if (!isChatboxOpen) return null;

  return (
    <div className="fixed bottom-0 right-4 z-20 bg-secondary w-[22rem] h-[28rem] shadow-sides rounded-t-lg">
      <div className="relative flex flex-row justify-between p-2 items-center">
        <div className="flex flex-row items-center gap-x-2">
          <img
            src={chatUser?.profilePicture || "/avatar.png"}
            alt="Profile"
            className="size-10 rounded-full  object-cover border-gray-300"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-md leading-none">
              {chatUser?.name || "Rain Kun"}
            </h1>
            <span className="text-sm text-gray-500">Active now</span>
          </div>
        </div>
        <div>
          <button className="text-primary" onClick={closeChatbox}>
            <X size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
