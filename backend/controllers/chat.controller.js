import PersonalChat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const createOrGetChat = async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    let chat = await PersonalChat.findOne({
      participants: { $all: [user1, user2] },
    });

    if (!chat) {
      chat = new PersonalChat({
        participants: [user1, user2],
        messages: [],
      });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;

    const message = new Message({
      chatId,
      sender,
      content,
      // author,
    });

    await message.save();

    await PersonalChat.findByIdAndUpdate(chatId, {
      $push: { messages: message._id },
      lastMessage: content,
      lastSender: sender,
      // author: author,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).populate(
      "sender",
      "username"
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatLists = async (req, res) => {
  try {
    const chats = await PersonalChat.find({
      participants: req.user._id,
      messages: { $exists: true, $not: { $size: 0 } },
    })
      .populate("participants", "username profilePicture lastMessage name")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getChats controller: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
