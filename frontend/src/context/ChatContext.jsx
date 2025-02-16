import { createContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);

  const openChatbox = (user) => {
    setIsChatboxOpen(true);
    setChatUser(user);
  };

  const closeChatbox = () => {
    setIsChatboxOpen(false);
    setChatUser(null);
  };
  return (
    <ChatContext.Provider
      value={{
        isChatboxOpen,
        chatUser,
        openChatbox,
        closeChatbox,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext };
