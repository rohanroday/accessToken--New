import jwt from "jsonwebtoken";
import config from "../config/config.js ";


export function generateToken(userId){
    const accessToken = jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return {accessToken,refreshToken};  
}

export function verifyRefreshToken(refreshToken){
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
}

export function verifyAccessToken(accessToken){
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
}
