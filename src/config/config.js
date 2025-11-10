import mongoose from "mongoose";
const uri = "mongodb+srv://Admin-Rajnish:OsrtelfBu2o75FI5@atlascluster.0fp1b9q.mongodb.net/chatapp?retryWrites=true&w=majority";
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