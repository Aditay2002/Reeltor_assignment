import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const authenticateUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
  
   
    const existingUser = await User.findOne({ email: userEmail });
    if (!existingUser) 
      return res.status(400).json({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(userPassword, existingUser.password);
    if (!passwordMatch) 
      return res.status(400).json({ message: "Invalid credentials" });


    const authToken = jwt.sign(
      { userId: existingUser._id }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      authToken,
      userDetails: existingUser,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { fullName, userEmail, userPassword, phoneNumber, userBio, availableHours, userRole } = req.body;

    
    let existingUser = await User.findOne({ email: userEmail });
    if (existingUser) 
      return res.status(400).json({ success: false, message: "User already registered" });

  
    const encryptedPassword = await bcrypt.hash(userPassword, 10);

  
    const newUser = await User.create({
      name: fullName,
      email: userEmail,
      password: encryptedPassword,
      mobileNumber: phoneNumber,
      bio: userBio,
      availabilityTime: availableHours,
      role: userRole,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userData: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const logoutUser = (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
};

