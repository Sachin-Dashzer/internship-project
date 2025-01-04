import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config('../.env')






export const registerUser = asyncHandler(async (req, res) => {


    const { name, email, password, hobby, discription } = req.body;


    if ([name, email, password, hobby, discription].some((item) => item?.trim() === "")) {

        return res.status(400).json({
            success: false,
            massage: "All the fields required !"
        });
    };

    const checkUser = await User.findOne({
        $or: [{ name }, { email }]
    });



    if (checkUser) {
        return res.status(400).json({
            success: false,
            massage: "User already exists !"
        });
    };

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword
    })

    const createdUser = await User.findById(newUser._id).select(
        "-password -email"
    );

    if (!createdUser) {
        return res.status(400).json({
            success: false,
            massage: "Error occured while registering user !"
        });
    };


    return res.status(200).json({
        success: true,
        massage: "User Registered successfully",
        createdUser
    });

});





export const loginUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!(name || email)) {
        return res.json({
            success: false,
            massage: "name or email required !"
        });
    };


    const checkUser = await User.findOne({
        $or: [{ name }, { email }]
    });


    if (!checkUser) {
        return res.json({
            success: false,
            massage: "User does not exists !"
        });
    };


    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
        return res.json({
            success: false,
            massage: "Incorrect Password !"
        });
    };

    const token = jwt.sign(
        {
            id: checkUser._id,
            email: checkUser.email,
            name: checkUser.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );


    return res.status(200)
        .cookie("token", token, { httpOnly: true, secure: true })
        .json({
            success: true,
            message: "Logged in successfully",
            user: {
                name: checkUser.name,
                email: checkUser.email,
                id: checkUser._id,
            },
        });
});







export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        massage: "User successfully logout !"
    });

});




export const checkAuth = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.json({
            success: false,
            massage: "Unauthorized User !"
        });
    };


    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {

        return res.status(401).json({
            success: false,
            massage: "Unauthorized User !"
        });
    };
});





