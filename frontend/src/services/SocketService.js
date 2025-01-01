import { io } from "socket.io-client";

// Create a socket connection to the server
const socket = io("http://localhost:5000");

export const connectSocket = () => {
  return socket;
};

export const emitNewComment = async (
  postId,
  comment,
  userId,
  name,
  profilePicture,
  headline
) => {
  socket.emit("newComment", {
    postId,
    comment,
    userId,
    name,
    profilePicture,
    headline,
  });
};

export const listenForComments = (callback) => {
  socket.on("receiveComment", (data) => {
    callback(data);
  });
};

export const disconnectSocket = () => {
  socket.off("receiveComment");
};
