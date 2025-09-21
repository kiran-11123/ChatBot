import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config();
import express from'express'

const Chat_router = express.Router();



const GENERATION_CONFIG = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 4096,
};
const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

Chat_router.post("/ask" ,async(req,res)=>{
  
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });

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

        const result = await chat.sendMessage(question);

        if(result.error){
            return res.status(400).json({
                message:result.error.message
            })
        }

        return res.status(200).json({
            message:"Output Fetched successfully...",
            data:result.response.text()
        })

        
    } catch (error) {
        spinner.stop();
        console.error(chalk.red('An error occurred:'), error.message);
        process.exit(1);
    }
});


export default Chat_router;