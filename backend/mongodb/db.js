import mongoose from 'mongoose'



const ConnectDB = async()=>{
       
    try{

        await mongoose.connect("mongodb://localhost:27017/ChatBot",{
            useNewUrlParser: true,
           useUnifiedTopology: true,
         })
         console.log("MongoDB connected Successfully..")

    }
    catch(er){
        console.log(er);
        process.exit(1);
    }
}

export default ConnectDB;