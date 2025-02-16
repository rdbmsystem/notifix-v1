import mongoose from "mongoose";

const personalChatSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        seen: { type: Boolean, default: false },
      },
    ],
    lastMessage: {
      type: String,
    },
    lastSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

const PersonalChat = mongoose.model("PersonalChat", personalChatSchema);
export default PersonalChat;
