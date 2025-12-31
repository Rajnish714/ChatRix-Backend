import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
export const connectDB = async () => {
    try{
         await mongoose.connect(uri, {
      dbName: "chatapp",
    });
    

    }catch(err){
        console.error(err);
    }

}