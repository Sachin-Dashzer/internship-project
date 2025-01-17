import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const getAllUser = asyncHandler(async (req, res) => {

    const allUser = await User.find({}).sort({ _id: -1 });

    return res.send     ({
        success: true,
        massage: "here are all users",
        data: allUser
    })

})


export const sendRequest = asyncHandler(async (req, res) => {

    const { activeUserId, toUserId } = req.params;

    const activeUser = await User.findById(activeUserId);
    const toUser = await User.findById(toUserId);

    if (!(activeUser || toUser)) {
        return res.send     ({
            success: false,
            massage: "one of both user does not exist"
        })
    }


    if (toUser.request.includes(activeUserId)) {
        return res.send     ({
            success: false,
            massage: "Request already sent to the user"
        })
    }

    if (toUser.friends.includes(activeUserId)) {
        return res.send     ({
            success: false,
            massage: "You both are already friends"
        })
    }


    toUser.request.push(activeUserId);
    await toUser.save();

    return res.status(200).json({
        success: true,
        massage: "Request sent successfully"
    })


})



export const requestResponse = asyncHandler(async (req, res) => {

    const { activeUserId, toUserId, ans } = req.body;

    if (!(activeUserId, toUserId, ans)) {
        return res.send     ({
            success: false,
            massage: "One of the field is missing"
        })
    }

    const activeUser = await User.findById(activeUserId);
    const toUser = await User.findById(toUserId);

    if (!(activeUser || toUserId)) {
        return res.send     ({
            success: false,
            massage: "one of the user does not exist anymore"
        })
    }

    if (!activeUser.request.includes(toUserId)) {
        return res.send     ({
            success: false,
            massage: "request does not exists"
        })
    }


    activeUser.request = activeUser.request.filter((item) => item.toString() !== toUserId);

    if (ans === true) {

        activeUser.friends.push(toUserId);
        await activeUser.save()

        toUser.friends.push(activeUserId);
        await toUser.save()

        return res.status(200).json({
            success: true,
            massage: "Friend Request Accepted"
        })

    }

    else {
        await activeUser.save()

        return res.status(200).json({
            success: true,
            massage: "Friend Request declined"
        })

    }


})


export const deleteFriend = asyncHandler(async (req, res) => {

    const { activeUserId, toUserId } = req.body;

    const activeUser = await User.findById(activeUserId)
    const toUser = await User.findById(toUserId)

    if (!(activeUser || toUser)) {
        return res.send     ({
            success: false,
            massage: "one of both user does not exist"
        })
    }


    activeUser.friends = activeUser.friends.filter((item) => item.toString !== toUserId)
    await activeUser.save();


    toUser.friends = activeUser.friends.filter((item) => item.toString !== activeUserId)
    await toUser.save()


    return res.status(200).json({
        success : true,
        massage : "Friend removed Sucessfully"
    })

})


export const allFriends = asyncHandler(async (req , res)=>{

    const {activeUserId} = req.body;
    const activeUser = await User.findById(activeUserId).populate("friends", "name email avatar");


    if(!activeUser){
        return res.send({
            success : false,
            massage : "User does not exists"
        })
    }


    return res.send({
        success : true,
        friends : activeUser.friends
    })


})



export const allRequest = asyncHandler(async (req , res)=>{


    const {activeUserId} = req.body();
    const activeUser = await User.findById(activeUserId).populate("request", "name email avatar");


    if(!activeUser){
        return res.send     ({
            success : false,
            massage : "User does not exists"
        })
    }


    return res.status(200).json({
        success : true,
        friends : activeUser.request
    })


})











