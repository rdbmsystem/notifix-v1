import express from "express";
import {
  createOrGetChat,
  sendMessage,
  getChatMessages,
  getChatLists,
} from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getChatLists);
router.get("/personal-messages/:chatId", protectRoute, getChatMessages);
router.post("/personal", protectRoute, createOrGetChat);
router.post("/personal-message", protectRoute, sendMessage);

export default router;
