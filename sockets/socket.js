import { Message } from "../src/models/message.model.js";
// import {User} from "../src/models/user.model.js"

const onlineUser= new Map()


 async function listen(io){

  io.on("connection",socket=>{
    console.log("user Conneted= ",socket.id);
socket.on("assign",selectuser=>{
  onlineUser.set(selectuser,socket.id)
  socket.data.username = selectuser;
   console.log(`🟢 ${selectuser} connected (${socket.id})`);

   socket.emit("assigned", { id: socket.id });
    io.emit("online_users", Array.from(onlineUser.keys())); 
    
})
  
  
  

    // socket.on("joinChat",(userId)=>{
    //   socket.join(room)
    //   console.log("you connected to room1"+ userId);
    // })
   
    // socket.on("chat",({senderId,text})=>{
    //   io.to(room).emit("chat",{senderId,text})
    // })


    


  socket.on("disconnect",() =>{
   const username = socket.data.username; // saved earlier
      if (username && onlineUser.has(username)) {
        onlineUser.delete(username);
        console.log(`🔴 ${username} disconnected`);
        io.emit("online_users", Array.from(onlineUser.keys()));
      } else {
        console.log(`❌ Unknown socket disconnected: ${socket.id}`);
      }
})
})


}




export default listen