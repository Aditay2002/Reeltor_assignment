import { Notification } from "../model/NotificationModel.js";
import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";

export const modifyUserProfile = async (req, res) => {
  try {
    const updatedUserDetails = req.body;
    const { userId } = req.user;

    if (updatedUserDetails.password) {
      const encryptedPassword = await bcrypt.hash(updatedUserDetails.password, 10);
      updatedUserDetails.password = encryptedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedUserDetails },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      userData: updatedUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the user profile.",
    });
  }
};

export const dispatchNotification = async (req, res) => {
  try {
    const { recipientUserIds, notificationMessage, notificationCategory } = req.body;
    const senderUserId = req.user.userId;

    const senderUser = await User.findById(senderUserId);

    if (notificationCategory === "critical" && senderUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can send critical notifications" });
    }

    const notificationType =
      senderUser.role === "admin" && notificationCategory === "critical"
        ? "critical"
        : "non-critical";
 
    const recipientUsers = await User.find({ _id: { $in: recipientUserIds } });

    if (recipientUsers.length === 0) {
      return res.status(404).json({ message: "No valid recipients found" });
    }

    const currentTimestamp = new Date();
    const currentTimeFormatted = currentTimestamp.toTimeString().slice(0, 5);

    const notificationRecords = recipientUsers.map((recipient) => {
      let deliveryStatus = "pending";

      if (notificationType === "critical") {
        deliveryStatus = "delivered";
      } else {
        const isUserAvailable = recipient.availabilityTime.some(
          ({ from, to }) => currentTimeFormatted >= from && currentTimeFormatted <= to
        );

        if (isUserAvailable) {
          deliveryStatus = "delivered";
        }
      }

      return new Notification({
        message: notificationMessage,
        sender: senderUserId,
        recipient: recipient._id,
        status: deliveryStatus,
        type: notificationType,
        sentAt: currentTimeFormatted,
        receivedAt: deliveryStatus === "delivered" ? currentTimeFormatted : null
      });
    });

    await Notification.insertMany(notificationRecords);
    res.status(201).json({ message: "Notifications sent successfully", notifications: notificationRecords });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
