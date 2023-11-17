import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, resp, next) => {
    
    const {token} = req.cookies;

    if(!token) return  resp.status(401).json({message: "Not Token, authorization denied"});

    jwt.verify(token,TOKEN_SECRET, (err, user) =>{
        if (err) return resp.status(403).json({message:"invalid token"});
        
        req.user = user
    })
    next()
}