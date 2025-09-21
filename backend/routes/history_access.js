import express from 'express'
import mongoose from 'mongoose'
import History from '../mongodb/ChatHistory.js'
import Authenticate_token from '../middleware/Authentication_token.js';
const History_router = express.Router();


History_router.get("/full-history" , Authenticate_token , async(req,res)=>{
         
    try{

        const userId = req.user.user_id;

        const find_history = await History.find({user_id: userId});

        if(find_history.data.length===0){
               return res.status(400).json({
                message:"History is Empty..",
                data:find_history.data
               })
        }

        return res.status(200).json({
            message:"History Feteched..",
            data:find_history.data
        })

    }
    catch(er){
          
        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})













export default History_router