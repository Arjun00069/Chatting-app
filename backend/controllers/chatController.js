import { asyncError } from "../middleware/errorMiddleware.js"
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModels.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const accessChat = asyncError(async(req,res,next)=>{
    const  {userId}=req.body;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:"UserId param not sent with request"
        })
    }
    var isChat =await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    })
    .populate("users","-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    })
    if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
    
        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
})

export const fetchChat = asyncError(async (req,res,next)=>{
    try {
 
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
})

export const createGroupChat=asyncError(async (req,res,next)=>{
    if(!req.body.users||!req.body.name){
        return next( new ErrorHandler("Enter users to create group",400));
    }
    var users =JSON.parse(req.body.users);
    if(users.length<2){
        return next(new ErrorHandler("More than 2 user are required to form a group chat",400))
    }
    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });
  
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password") 
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
})

export const renameGroupChat =asyncError(async (req,res,next)=>{
    const {chatId,chatName} =req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new:true
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password")
    if(!updatedChat){
       return next(new ErrorHandler("Chat not found",404));

    }
    res.json(updatedChat);
})

export const addToGroup =asyncError(async(req,res,next)=>{
    const {chatId,userId} =req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
        $push:{users:userId}},
        {
            new:true
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
        return next(new ErrorHandler("Chat not found",404))
    }else{
        res.status(200).json(added);
    }

})
export const removeFromGroup=asyncError(async(req,res)=>{
    const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
   return next(new ErrorHandler("Chat Not Found",404));
  } else {
    res.status(200).json(removed);
  }
})