
const url= "http://localhost:3000/v1/users/"
const socket=io()

const input = document.getElementById("inputs");
const button = document.getElementById("send");
const chatList = document.getElementById("chat");
const userslist=document.getElementById("users");

let currentUser
let receverId

socket.on("connect",()=>{
  console.log("user connected = ", socket.id);
})

async function fetchUsers() {
  try {
    const res = await fetch(url);       
    const data = await res.json();       
   return data      
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}



const populateuser= async ()=>{
  const users= await fetchUsers();
 users.map(user=>{
const option= document.createElement("option");
option.value = user._id
option.textContent = user.username;
userslist.appendChild(option)
 })
       
          
}
populateuser()
          




userslist.addEventListener("change",()=>{
  const selectuser= userslist.options[userslist.selectedIndex].text
  console.log("user selected "+ selectuser);
  socket.emit("assign",selectuser)
})







// socket.on("assign_user",userId=>{
//   currentUser=userId
//   console.log("user are user " + currentUser);
//   receverId= userId==="user1"?"user2":"user1"
//   socket.emit("joinChat", currentUser)
// })
socket.on("online_users", (users) => {
  console.log("🧑‍💻 Online Users:", users);
  // You can update UI here to show who’s online
});



button.addEventListener("click",()=>{
    let msg= input.value.trim("")
  if (msg) {
     
             
    socket.emit("chat", {
       senderId: currentUser,
        text: msg,
    });
    input.value = "";
  }

})  


socket.on("chat", msg=>{
  console.log(msg);
   const  li= document.createElement("li");
        li.textContent = `${msg.senderId}: ${msg.text}`;
          chatList.appendChild(li)
})


// -------------select user--------
