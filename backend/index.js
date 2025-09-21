import express from "express"
import dotenv from"dotenv"
import Chat_router from "./routes/chatbot.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Auth_Router from "./routes/Authentication_routes.js";
import ConnectDB from "./mongodb/db.js";
import History_router from "./routes/history_access.js";
const app = express();
app.use(cors());

ConnectDB();
app.use(express.json());
app.use(cookieParser());




app.use("/chat" , Chat_router);
app.use("/user",Auth_Router);
app.use("/history" , History_router)
















app.listen(3000,()=>{
    console.log("Server Connected...")
})