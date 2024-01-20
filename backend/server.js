import app from "./app.js"
import {connectDB} from "./config/database.js"
 connectDB();
app.get('/',(req,res)=>{
    res.send("<h1>Working</h1>")
})

app.listen(4000,()=>{
    console.log(`App is listning: http//localhost:${process.env.PORT}`);
})