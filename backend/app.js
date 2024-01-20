import express ,{urlencoded}from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config({
    path: "./config/config.env",
  });
 const app =express();
 export default app;
app.use(urlencoded({
    extended:true
}))
app.use(express.json());



//Importing Route
import chatRoutes from "./routes/chatRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"

app.use(cors({
    credentials:true,
    origin: "http://localhost:3000",
   
  }))
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);






app.use(errorMiddleware)