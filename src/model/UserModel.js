import mongoose from "mongoose";  

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    contactNumber: {
      type: String,
    },
    profileBio: {
      type: String,
    },
    availableTimings: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
