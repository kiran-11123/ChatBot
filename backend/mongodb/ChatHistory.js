import mongoose from "mongoose";

const history_model = new mongoose.Schema({
       
    user_id : {type:Number ,required:true},
    history: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
            timestamp: { type: Date, default: Date.now } // optional, for ordering
        }
    ]


})

const History = mongoose.model("ChatHistory", history_model);
export default History;