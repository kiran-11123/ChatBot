import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

const Authenticate_token = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("Cookies:", req.cookies);
  console.log("Token:", token);


  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default Authenticate_token;
