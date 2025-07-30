import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"



const options = {
    httpOnly : true,
    secure : true
}

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);

        if(!user){
            throw new Error("User not found while generating token")
        }

        const accessToken = user.genetateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false})

        return { accessToken, refreshToken }

    } catch (error) {
        console.error("generateAccessAndRefreshToken error", error);
        throw new ApiError(500, "Something went wrong");
    }
}


const refreshAccessToken = asyncHandler( async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new ApiError(401, "Invalid Refresh Token!");
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used");
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", newRefreshToken)
        .json(
            new ApiResponse(
                200, {accessToken, refreshToken: newRefreshToken}, "Access Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})



const signup = asyncHandler( async(req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        throw new ApiError(400, "Both email and password are required")
    }

    const isUserExists = await User.findOne({
        $or: [{email}]
    })

    if(isUserExists){
        throw new ApiError(409, "User with this email already exists");
    }

    const createUser = await User.create({email, password});

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(createUser._id);

    return res
        .status(201)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, {
                user : {
                    _id: createUser._id,
                    email: createUser.email
                },
                accessToken
            }, "User Registered Successfully")
        )

})

export {
    signup
}