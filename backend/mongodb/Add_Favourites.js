import mongoose from "mongoose";

const Add_to_Favourites = new mongoose.Schema({
       
     user_id : {type:Number ,required:true},
     favourites: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
            timestamp: { type: Date, default: Date.now } // optional, for ordering
        }
    ]
})


const favourites = mongoose.model("user_favourites" , Add_to_Favourites);


export default favourites;