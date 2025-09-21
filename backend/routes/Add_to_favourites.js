import express from 'express'
import favourites from '../mongodb/Add_Favourites.js'
const Favourite_Router =express.Router();
import Authenticate_token from '../middleware/Authentication_token.js';

Favourite_Router.post("/add" , Authenticate_token , async(req,res)=>{
        

    try{

        const userId = req.user.user_id;

        const {question , answer} = req.body;

        const newEntry = { question , answer };

       
        const userFavourites = await favourites.findOne({ user_id: userId });

        if (userFavourites) {
            // Append the new Q&A to existing favourites
               favourites.favourites.push(newEntry);
               await userFavourites.save();
         } else {
            // If no favourites exists, create a new document
            await favourites.create({ user_id: userId, favourites: [newEntry] });
          }
    }
    catch(er){
         return res.status(500).json({
            message:"Internal Server Error",
            error:er
         })
    }
})


Favourite_Router.get("/show" , Authenticate_token , async(req,res)=>{
       
    try{

        const userId = req.user.user_id;

        const All_data = await favourites.find({user_id:userId});

        if(All_data.length===0){
              
            return res.status(400).json({
                message:"No Favourites Available",
                data:All_data
            })
        }

        return res.status(200).json({
            message:"Data Feteched Successfully..",
            data:All_data
        })

    }
    catch(er){
         return res.status(500).json({
            message:"Internal Server Error",
            error:er
         })
    }
})










export default Favourite_Router;