import express from "express"
import dotenv from"dotenv"
import Chat_router from "./routes/chatbot.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Auth_Router from "./routes/Authentication_routes.js";
import ConnectDB from "./mongodb/db.js";
import History_router from "./routes/history_access.js";
import rateLimit from "express-rate-limit";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

ConnectDB();
app.use(express.json());
app.use(cookieParser());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);




app.use("/chat" , Chat_router);
app.use("/user",Auth_Router);
app.use("/history" , History_router)
















app.listen(3000,()=>{
    console.log("Server Connected...")
})