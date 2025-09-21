import express from "express"
import dotenv from"dotenv"
import Chat_router from "./routes/chatbot.js";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());
app.use("/chat" , Chat_router);

















app.listen(3000,()=>{
    console.log("Server Connected...")
})