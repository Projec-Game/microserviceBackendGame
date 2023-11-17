import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req,resp) =>{
    const {email, password,username}=req.body
    try {

        const userFound = await User.findOne({email})
        if(userFound) return resp.status(400).json({message: ["the email already exist"]})
        
        const passwordHash = await bcrypt.hash(password, 10) //hash

        const newUser = new User({
             username,
             email,
             password:passwordHash
         })
         const userSaved = await newUser.save();
         const token = await createAccessToken({id:userSaved._id})
        
         resp.cookie('token', token);
         resp.json({
             id:userSaved._id,
             username: userSaved.username,
             email: userSaved.email,
             createdAt: userSaved.createdAt,
             updateAd: userSaved.updateAd
         })
     } catch (error) {
         resp.status(500).json({mesage:error.message});
     }
 }


export const login = async (req,resp) =>{
    const {email, password}=req.body
    try {

        const userFound = await User.findOne({email})

        if (!userFound) return resp.status(400).json({message: "User not Found"})

        const isMatch =await bcrypt.compare(password, userFound.password) //hash
        if (!isMatch) return resp.status(400).json({message: "Incorrect password"})
        
        const token = await createAccessToken({id: userFound._id})
        
        resp.cookie('token', token);
        resp.json({
            id:userFound._id,
            username: userFound.username,
            email: userFound.email,
            nickname:userFound.nickname,
            createdAt: userFound.createdAt,
            updateAd: userFound.updateAd
        })
    } catch (error) {
        resp.status(500).json({mesage:error.message});
    }
}

export const logout = (req, resp) =>{
    resp.cookie('token',"",{
        expires: new Date(0)
    })
    return resp.sendStatus(200);
}

export const profile = async  (req, resp)=>{
    const userFound = await User.findById(req.user.id)
    
    if (!userFound) return resp.status(400).json({message: "User not found"});
    
    return resp.json({
        id: userFound._id,
        username: userFound.username,
        email:userFound.email,
        nickname:userFound.nickname,
        createdAt:userFound.createdAt
    })
    
    resp.send("profile")
}

export const verifyToken  = async (req, resp)=>{
    const {token} = req.cookies;

    if (!token) return resp.status(401).json({message: "Unauthorized"});

    jwt.verify(token, TOKEN_SECRET, async (err,user)=>{
        if(err) return resp.status(401).json({message: "Unauthorized"});

        const userFound = await User.findById(user.id)
        if (!userFound) return resp.status(401).json({message: "Unauthorized"});

        return resp.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
};
