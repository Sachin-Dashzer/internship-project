import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config('../.env')





export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, hobby } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return res.send({
            success: false,
            message: "Name, email, and password are required!",
        });
    }

    if (!Array.isArray(hobby) || hobby.length === 0) {
        return res.send({
            success: false,
            message: "Hobby must be a non-empty array!",
        });
    }

    const checkUser = await User.findOne({
        $or: [{ name }, { email }],
    });

    if (checkUser) {
        return res.send({
            success: false,
            message: "User already exists!",
        });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        hobby,
    });

    const createdUser = await User.findById(newUser._id).select("-password -email");

    if (!createdUser) {
        return res.send({
            success: false,
            message: "Error occurred while registering the user!",
        });
    }

    return res.send({
        success: true,
        message: "User registered successfully!",
        createdUser,
    });
});





export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        res.send({
            success: false,
            massage: "Email Id is required !"
        })
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.send({
            success: false,
            massage: "User does not exist. Recheck email !"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        res.send({
            success: false,
            massage: "Invalid user credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
        success: true,
        massage: "Logged in successfully !",
        user: {
            email: user.email,
            id: user._id,
            name: user.name,
        },
    });

});






export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        massage: "User successfully logout !"
    });

});




export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.send({
            success: false,
            massage: "Unauthorized user!",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            massage: "Unauthorized user!",
        });
    }
};








// export const registerMultipleUsers = asyncHandler(async (req, res) => {
//     const users = req.body;

//     //     if (!Array.isArray(users) || users.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: "Request body must be a non-empty array of users!"
//         });
//     }



//     const responses = await Promise.all(
//         users.map(async (user) => {
//             const { name, email, password, hobby = [], description } = user;

//             //             if (
//                 !name?.trim() ||
//                 !password?.trim() ||
//                 !Array.isArray(hobby) ||
//                 !description?.trim()
//             ) {
//                 return {
//                     success: false,
//                     message: "All fields are required for each user, and email must be valid!",
//                     user: { name, email }
//                 };
//             }

//             try {
//                 //                 const existingUser = await User.findOne({
//                     $or: [{ name }, { email }]
//                 });

//                 if (existingUser) {
//                     return {
//                         success: false,
//                         message: `User with name "${name}" or email "${email}" already exists!`,
//                         user: { name, email }
//                     };
//                 }

//                 //                 const hashedPassword = await bcrypt.hash(password, 12);

//                 //                 const newUser = await User.create({
//                     name,
//                     email,
//                     password: hashedPassword,
//                     hobby,
//                     description
//                 });

//                 //                 const createdUser = await User.findById(newUser._id).select("-password");

//                 return {
//                     success: true,
//                     message: "User registered successfully!",
//                     createdUser
//                 };
//             } catch (error) {
//                 return {
//                     success: false,
//                     message: "Error occurred while registering user!",
//                     error: error.message,
//                     user: { name, email }
//                 };
//             }
//         })
//     );

//     return res.status(200).json({
//         success: true,
//         message: "User registration completed with responses for each user.",
//         responses
//     });
// });
