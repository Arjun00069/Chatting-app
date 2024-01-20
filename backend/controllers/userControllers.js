import {asyncError} from "../middleware/errorMiddleware.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/userModels.js";
import { generateToken } from "../config/generateToken.js";

export const registerUser =asyncError(async (req,res,next)=>{
const {name,email,password,pic }=req.body;
if(!name ||!email|| !password){
return next( new ErrorHandler("Please enter all fields",400))
}
const userExists = await User.findOne({email})
if(userExists){
    return next(new ErrorHandler("User already exist",400));
}else{
    const user =await User.create({
        name,email,password,pic
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token:generateToken(user._id),
        })
    }else{
        return next( new ErrorHandler("Failed to create user",400))
    }

}

})

export const authUser =asyncError(async (req,res,next)=>{
const {email,password} =req.body
const user =await User.findOne({email})
if(user&&(await user.matchPassword(password))){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token:generateToken(user._id),
    })
}else{
    return next(new ErrorHandler("INvalid email or password",400))
}
})

export const getUsers =asyncError(async (req,res,next)=>{
    const keyword =  req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}

        ]
    }:{}
    const users =await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
})
