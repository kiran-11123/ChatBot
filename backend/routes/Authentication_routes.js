import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();

const prisma = new PrismaClient();
const Auth_Router = express.Router();
const jwt_secret_ket = process.env.JWT_SECRET_KEY;



Auth_Router.post("/signin",async(req,res)=>{

    try{

        const {email , password} = req.body;

        const email_check = await prisma.findUnique({
            where:{
                email,
            }
        })

        if(!email_check){
             return  res.status(400).json({
                message:"Email not found . Please Register.."
             })
        }

        const password_check = await bcrypt.compare(email_check.password , password);

        if(!password_check){
             return res.status(400).json({
                message:"Given Password is Wrong.."
             })
        }

        const token_details = {"user_id":email_check.id , "username":email_check.username , "email":email_check.email}

        const token = jwt.sign(token_details ,jwt_secret_ket ,{ expiresIn: "1h" })

         res.cookie("token", token, {
                httpOnly: true,
                secure: false,        
                sameSite: "lax",      
                maxAge: 3600000
            });

        return res.status(200).json({
            message:"User LoggedIn Successfully..",
            token:token,
        })

    }
    catch(er){
          
        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})


Auth_Router.post("signup" , async(req,res)=>{
       
    try{

        const {username , email , password} = req.body;

        const email_check = await prisma.user.findUnique({
            where:{email}
        })

        if(email_check){
            return res.status(400).json({
                message:"Email Already Registered.. Please Login"
            })
        }

        const username_check = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
         
        if(username_check){
            return res.status(200).json({
                message:"Username already taken "
            })
        }

        const encode_password  = await bcrypt.hash(password,10);

        const user_data = await prisma.user.create({
            date:{
                username:username,
                email:email,
                password :encode_password
            }
        })

         return res.status(200).json({
            message:"User Registered Successfully !!"
        })

         

    }
    catch(er){
         return res.status(500).json({
            message:"Internal Server Error",
            error:er
         })
    }
})

















export default Auth_Router; 
