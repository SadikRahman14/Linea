import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Message from "../models/messages.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getMessages = asyncHandler( async(req,res) => {
    const userOne = req.userId;
    const userTwo = req.body.id;

    if(!userOne || !userTwo){
        throw new ApiError(400, "Bcoth User ID is required")
    }

    const messages = await Message.find({
        $or: [
            { sender: userOne, recipient: userTwo },
            { sender: userTwo, recipient: userOne}
        ],
    }).sort({timestamps: 1});

    return res.status(200).json(
        new ApiResponse(
            200,
            {messages},
            "All Messeges Fetched Successfully!!"
        )
        
    )
})




export {
    getMessages,
}