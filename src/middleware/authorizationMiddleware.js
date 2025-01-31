import jwt from "jsonwebtoken"; 

export const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedPayload = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    console.log(decodedPayload);
    req.user = decodedPayload;

    next();
  } catch (error) {
    console.error(`[Authentication Error]: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
