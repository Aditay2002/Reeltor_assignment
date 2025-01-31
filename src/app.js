import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/databaseConnector.js";
import authEndpoints from "./routes/authRoutes.js";
import userEndpoints from "./routes/userRoutes.js";
import scheduleNotificationProcessing from "./utils/notificationScheduler.js";

dotenv.config();
const server = express();
server.use(express.json());
server.use("/api/v1/auth", authEndpoints);
server.use("/api/v1/user", userEndpoints);
scheduleNotificationProcessing();

connectDB();
server.listen(3000, () => {
    console.log("Application is running on port 3000");
});
