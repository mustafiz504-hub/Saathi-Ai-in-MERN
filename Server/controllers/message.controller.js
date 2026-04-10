import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  //   console.log("message id => ", req.params.id, "message => ", req.body.message);
  //   res.status(200).json({ message: "message sent Sucsessfully" });
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.User._id; //current logged in user

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]); //run parallel
    const receiverSocketId = getRecieverSocketId(recieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: "Message sent successfully", newMessage });
    console.log(newMessage);
  } catch (error) {
    console.log("error in sending message" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.User._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json({ message: "No messages yet" });
    }

    const messages = conversation.messages;
    return res.status(201).json({ messages });
  } catch (error) {
    console.log("error in getting messages" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
