import { generateToken, verifyRefreshToken, verifyAccessToken } from "../utils/auth.util.js";
import userModel from "../models/auth.model.js";
import sessionModel from "../models/session.model.js";
import bcrypt from "bcrypt";




export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const ifUserExist = await userModel.findOne({ email });
    if(ifUserExist){
        return res.status(400).json({ message: "Email already exists" });
    }
    const user = await userModel.create({
        name,
        email,
        password:await bcrypt.hash(password, 10),
    });

    const tokens = generateToken(user._id);

    await sessionModel.create({
        userId:user._id,
        refreshTokenHash:await bcrypt.hash(tokens.refreshToken, 10),
    });

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User registered successfully",user, accessToken:tokens.accessToken });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if(!user){
        return res.status(400).json({ message: "Email or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: "Email or password is incorrect" });
    }
    const tokens = generateToken(user._id);
    await sessionModel.create({
        userId:user._id,
        refreshTokenHash:await bcrypt.hash(tokens.refreshToken, 10),
    });

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User logged in successfully",user, accessToken:tokens.accessToken });   
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if(!refreshToken){
        return res.status(400).json({ message: "Refresh token is required 1" });
    }
    try{
        const decoded = verifyRefreshToken(refreshToken);
        if(!decoded){
        return res.status(401).json({ message: "Refresh token is invalid 2" });
    }
    const session = await sessionModel.findOne({userId:decoded.userId});
    if(!session){
        return res.status(401).json({ message: "Refresh token is invalid 3" });
    }
    const isRefreshTokenValid = await bcrypt.compare(refreshToken, session.refreshTokenHash);
    if(!isRefreshTokenValid){
        await sessionModel.deleteMany({userId:decoded.userId});
        return res.status(401).json({ message: "Refresh token is invalid 4" });
    }

    const tokens = generateToken(decoded.userId);
    console.log(tokens);
    await sessionModel.findOneAndUpdate({userId:decoded.userId},{
        refreshTokenHash:await bcrypt.hash(tokens.refreshToken, 10),
    },{
        upsert:true,
    });
    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: "Refresh token is valid", accessToken:tokens.accessToken });
    }catch(err){
        return res.status(401).json({ message: "Refresh token is invalid 5" });
    }
    
}

export const getUser = async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    if(!accessToken){
        return res.status(401).json({ message: "Access token is required" });
    }
    try{
        const decoded = verifyAccessToken(accessToken);
        if(!decoded){
        return res.status(401).json({ message: "Access token is invalid" });
    }
    const user = await userModel.findById(decoded.userId);
    if(!user){
        return res.status(401).json({ message: "User not found" });
    }
    return res.status(201).json({ message: "User is valid",user });
    }catch(err){
        return res.status(401).json({ message: "Access token is invalid" });
    }
}