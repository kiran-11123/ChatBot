import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const Auth_Router = express.Router();



Auth_Router.post("/signin",async(req,res)=>{

    try{

        const {email , password} = req.body;

        const email_check = await prisma.find({
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

        return res.status(200).json({
            message:"User LoggedIn Successfully.."
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
