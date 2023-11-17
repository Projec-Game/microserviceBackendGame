// auth.services.js

// import User from "../models/user.model.js";
// import bcrypt from 'bcryptjs';

// import { createAccessToken } from "../libs/jwt.js";

// export const registerUser = async ({ email, password, username }) => {
//     try {
//         const passwordHash =await bcrypt.hash(password, 10) //hash
//         const newUser = new User({
//         username,
//         email,
//         password:passwordHash
//         })
//         const userSaved = await newUser.save();
//         const token = await createAccessToken({id:userSaved._id})        
//         resp.cookie('token', token);
//         resp.json({
//             id:userSaved._id,
//             username: userSaved.username,
//             email: userSaved.email,
//             createdAt: userSaved.createdAt,
//             updateAd: userSaved.updateAd
//         })
//     } catch (error) {
//         return { error: error.message };
//     }
// };
