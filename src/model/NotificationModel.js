import mongoose from "mongoose";  

const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: ["critical", "non-critical"],
    required: true,
    default: "non-critical",
  },
  deliveryStatus: {
    type: String,
    enum: ["delivered", "pending"],
    required: true,
    default: "pending",
  },
  sentAt: {
    type: String,
    required: true,
  },
  receivedAt: {
    type: String,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
