import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const searchContact = asyncHandler(async(req,res) => {
    const {searchTerm} = req.body;
    const {userId} = req;

    if(searchTerm === undefined || searchTerm === null){
        throw new ApiError(400, "Search Term is Required");
    }

    const sanitizedSearchTerm  = searchTerm.replace(
        /[.*+?^${}()|[\]\\]/g, "\\$&"
    );

    const regx = new RegExp(sanitizedSearchTerm , "i");

    const contacts = await User.find({
        $and:[
            {_id: { $ne: userId }},
            {
                $or: [{ firstName: regx}, {lastName: regx}]
            }
        ]
    })

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {contacts},
            "Searching Triggered"
        )
    )
})

export {searchContact}