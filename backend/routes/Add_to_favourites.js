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











export default Favourite_Router;