import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import History from "../mongodb/ChatHistory.js";

import dotenv from "dotenv";
dotenv.config();
import express, { response } from'express'
import Authenticate_token from "../middleware/Authentication_token.js";

const Chat_router = express.Router();


//Configuration for Gemini AI
const GENERATION_CONFIG = {
    temperature: 0.9, // Increased temperature for more creative responses
    topK: 1,  // Keeping topK at 1 for more focused responses
    topP: 1, // Keeping topP at 1 for more focused responses
    maxOutputTokens: 4096, // Increased to handle larger responses
};

//Safety settings to avoid harmful content
const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

Chat_router.post("/ask" ,Authenticate_token  , async(req,res)=>{
  
    try {

        const userId = req.user.user_id;

        //Connecting to the Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });
        
        //Starting the chat session
        const chat = model.startChat({
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
            history: [],
        });

  

       
        const question = req.body.question;
        if(!question || question.length===0){
             return res.status(400).json({
                message:"Please Provide the valid question.."
             })
        }

        //Sending the user question to the chat
        const result = await chat.sendMessage(question);

        if(result.error){
            return res.status(400).json({
                message:result.error.message
            })
        }

        if(result.response.text()){

            try{

            const answer = result.response.text();

             const newEntry = { question , answer };

       
             const userHistory = await History.findOne({ user_id: userId });

        if (userHistory) {
            // Append the new Q&A to existing history
               userHistory.history.push(newEntry);
               await userHistory.save();
         } else {
            // If no history exists, create a new document
            await History.create({ user_id: userId, history: [newEntry] });
          }

          console.log("Data added into the user history...")

        }

        catch(er){
            console.log(er);
        }

    }

        return res.status(200).json({
            message:"Output Fetched successfully...",
            data:result.response.text(),
            all_data:result.response
        })

        
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
});


export default Chat_router;