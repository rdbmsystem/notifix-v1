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
  profilePicture
) => {
  socket.emit("newComment", { postId, comment, userId, name, profilePicture });
};

export const listenForComments = (callback) => {
  socket.on("receiveComment", (data) => {
    callback(data);
  });
};

export const disconnectSocket = () => {
  socket.off("receiveComment");
};
