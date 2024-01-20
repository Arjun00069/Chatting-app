import { asyncError } from "../middleware/errorMiddleware.js";
import { Chat } from "../models/chatModel.js";
import {Message} from "../models/messageModel.js"
import { User } from "../models/userModels.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const sendMessage =asyncError(async (req,res)=>{
 const {content,chatId}=req.body;
 if(!content||!chatId){
    return next(new ErrorHandler("Invalid data passed into request",400))
 }
var newMessage={
    sender:req.user._id,
    content:content,
    chat:chatId
};
try {
    var message = await Message.create(newMessage);
    message =await message.populate("sender","name pic");
    //.execPopulate bexause only scema being populated if it has benn use in query then we dont need to use them
    message= await message.populate("chat");
    message = await User.populate(message,{
        path:'chat.users',
        select:"name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage:message
    })
    res.status(200).json(message)
} catch (error) {
    return next(new ErrorHandler(error.message,400))
}




})

export const allMessage =asyncError(async(req,res)=>{
    try {
        const message =await Message.find({chat:req.params.chatId})
        .populate("sender","name pic email")
        .populate("chat");
        res.status(200).json(message);
    } catch (error) {
         return next(new ErrorHandler(error.message,400));
    }
})