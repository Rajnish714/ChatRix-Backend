
import "dotenv/config";
import app from"./app.js"
import http from "http"
import listen from "./sockets/index.js"
const server = http.createServer(app)
import {Server} from "socket.io"
import { connectDB } from "./src/config/config.js"
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";
const allowedOrigins = process.env.CORS_ORIGINS.split(",");
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

async function onload() {
    try{
       
      await connectDB()
      
      listen(io)
       
       server.listen(PORT,HOST,()=>{
         console.log(`Server running on ${HOST}:${PORT}`);
       }
      )
   
    }catch(err){
        console.log(err,"something went wrong ");
    }
}

onload()



