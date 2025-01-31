import cron from "node-cron";
import { NotificationModel } from "./model/NotificationModel.js";
import { UserModel } from "./model/UserModel.js";

const processPendingNotifications = async () => {
  try {
    const currentTime = new Date().toTimeString().slice(0, 5);
    const pendingNotifications = await NotificationModel.find({ status: "pending" });

    for (const notification of pendingNotifications) {
      const recipient = await UserModel.findById(notification.recipient);

      if (recipient) {
        const isAvailable = recipient.availabilityTime.some(({ from }) => from === currentTime);
 
        if (isAvailable) {
          notification.status = "delivered";
          notification.received = currentTime;
          await notification.save();
          console.log(`Notification delivered to ${recipient.email}: ${notification.message}`);
        }
      }
    }
  } catch (error) {
    console.error("Error processing pending notifications:", error);
  }
};

cron.schedule("* * * * *", async () => {
  console.log("Checking for pending notifications...");
  await processPendingNotifications();
});

export default processPendingNotifications;

