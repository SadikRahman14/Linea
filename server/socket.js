import { Server as SocketIoServer } from "socket.io"
import Message from "./src/models/messages.model.js";

const setupSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected:: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()){
      if(socketId === socket.id){
        userSocketMap.delete(userId);
        break;
      }
    }
  }

  // Change sendMessage to accept senderId explicitly
  const sendMessage = async (message, senderId) => {
    if (!senderId) {
      console.error("Sender ID missing");
      return;
    }

    // Overwrite sender in message for security
    message.sender = senderId;

    if (!message.recipient) {
      console.error("Recipient missing in message", message);
      return;
    }

    try {
      const senderSocketId = userSocketMap.get(senderId);
      const recipientSocketId = userSocketMap.get(message.recipient);

      const createdMessage = await Message.create(message);

      const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .populate("recipient", "id email firstName lastName image color");

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("recieveMessage", messageData);
      }

      if (senderSocketId) {
        io.to(senderSocketId).emit("recieveMessage", messageData);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User Connected :: ${userId} with socket id: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection");
    }

    // Pass senderId (userId) explicitly on sendMessage
    socket.on("sendMessage", (message) => sendMessage(message, userId));

    socket.on("disconnect", () => disconnect(socket));
  });
}

export default setupSocket;
