import mongoose from "mongoose";

export const connectDB  =async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            
       
          }); 
        console.log(`Database is connected with ${connection.connection.host}`)
    } catch (error) {
        console.log("Error connecting to database",error.message)
    }
}