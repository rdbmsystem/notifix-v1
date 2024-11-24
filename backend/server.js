// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import { connectDB } from "./lib/database.js";
// import cookieParser from "cookie-parser";
// import notificationRoutes from "./routes/notification.route.js";
// import connectionRoutes from "./routes/connection.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// app.use("/api/v1/connections", connectionRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectDB();
// });

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { Server as SocketIOServer } from "socket.io";
// import http from "http";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import { connectDB } from "./lib/database.js";
// import cookieParser from "cookie-parser";
// import notificationRoutes from "./routes/notification.route.js";
// import connectionRoutes from "./routes/connection.route.js";

// dotenv.config();

// const app = express();
// const server = http.createServer(app); // Create the HTTP server
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "http://localhost:5173", // Allow your frontend's origin
//     credentials: true,
//   },
// });

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// app.use("/api/v1/connections", connectionRoutes);

// // WebSocket logic
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Listen for 'newComment' event from clients
//   socket.on(
//     "newComment",
//     ({ postId, comment, userId, name, profilePicture }) => {
//       // Broadcast the comment to all clients except the sender
//       io.emit("receiveComment", {
//         postId,
//         comment,
//         userId,
//         name,
//         profilePicture,
//       });
//     }
//   );

//   // Handle user disconnect
//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   // Database connection
//   connectDB();
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";

import { connectDB } from "./lib/database.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create the HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Frontend origin
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware setup

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// WebSocket (Socket.IO) logic
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listening for a 'newComment' event
  socket.on(
    "newComment",
    ({ postId, comment, userId, name, profilePicture }) => {
      console.log(
        `New comment on post ${postId} from user ${name} (${userId}): ${comment}`
      );

      // Broadcast the comment to all connected clients
      io.emit("receiveComment", {
        postId,
        comment,
        userId,
        name,
        profilePicture,
      });
    }
  );

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Connect to the database
  try {
    await connectDB();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
