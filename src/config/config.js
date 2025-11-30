import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
export const connectDB = async () => {
    try{
         await mongoose.connect(uri, {
      dbName: "chatapp",
    });
    
       console.log("db connected");
    }catch(err){
        console.log(err);
    }

}