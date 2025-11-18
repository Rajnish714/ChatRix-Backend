
const url = "http://localhost:3000/v1/";
let socket;

 const chatList = document.getElementById("chat");
let currentUser = sessionStorage.getItem("username");
let receiverid
const currentPage = window.location.pathname;

//---------------signup page--------------------------
async function signupuser(username,email,password) {
   try {
      const res = await fetch(`${url}users/signup`,{
        method:"POST",
         headers: {
        "Content-Type": "application/json"  
      },
     body: JSON.stringify({ username,email,password })}
        );


     const data = await res.json(); 

    if (!res.ok) {
     
      throw new Error( data.message || "Signup failed");
    }

    return data; 
    } catch (err) {
      console.error("Error in signup user:", err);
      return err
    }

}

const signup = document.getElementById("Signup");
signup.addEventListener("submit",async e=>{
 
  e.preventDefault();
  
 const username= document.getElementById("username").value
 const email= document.getElementById("email").value
 const password= document.getElementById("password").value

const res=await signupuser(username,email,password)
console.log(res);
})



//----------------login page-----------------

// index page--------------------------
  const userslist = document.getElementById("users");
  async function fetchMessage(selectedUser) {
    try {
      const res = await fetch(`${url}messages?receiver=${selectedUser}&sender=${currentUser}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

   async function RemoveMessages() {
 const items = document.getElementsByTagName("li");
  
  while (items.length > 0) {
    items[0].remove();
  }
   }
 async function populateMessages(selectedUser) {
   const msgs = await fetchMessage(selectedUser);
  
    msgs.forEach((msg) => {
      
     const li = document.createElement("li");

     if (currentUser !== msg.sender) {
    li.classList.add("left");   
      
  }
  else{
     li.classList.add("right"); 
  }
  li.textContent = `${msg.sender}: ${msg.text}`;
    chatList.appendChild(li )
    })
  }

  async function fetchUsers() {
    try {
      const res = await fetch(`${url}users`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
 async function populateUsers() {
   const users = await fetchUsers();

    users.forEach((user) => {
      if (currentUser && user.username === currentUser) return;

      const option = document.createElement("option");
      option.value = user._id;
      option.textContent = user.username;
      userslist.appendChild(option);
    })
  }



  // ----------------------------chat page----------------

if (currentPage.endsWith("index.html") || currentPage === "/") {

  const selectBtn = document.getElementById("select");

 //poupulate user if exists for static index page
 
  populateUsers();

  let selectedUser = "";
  userslist.addEventListener("change", () => {
    selectedUser = userslist.options[userslist.selectedIndex].text;
   
  });


  selectBtn.addEventListener("click", () => {
    if (!selectedUser) {
      alert("Please select a user first!");
      return;
    }

   sessionStorage.setItem("username", selectedUser);

    window.location.href = "/chat.html";
  });
}


if (currentPage.endsWith("chat.html")) {
  const input = document.getElementById("inputs");
  const button = document.getElementById("send");
 
const name= document.getElementById("name")


  if (!currentUser) {
      window.location.href = "/index.html";
  }

   populateUsers();
   
  socket = io();
  socket.on("connect", () => {
    console.log("Connected:", socket.id);
    socket.emit("assign", currentUser);
  });
socket.on("assigned",selected=>{
  currentUser=selected
  name.textContent=currentUser
  console.log("you are user:"+ currentUser);
})
  socket.on("online_users", (users) => {
    console.log("🧑‍💻 Online Users:", users);
  });

  let selectedUser = "";
  userslist.addEventListener("change", () => {
    selectedUser = userslist.options[userslist.selectedIndex].text;

    console.log("User selected:", selectedUser);
     socket.emit("joinChat",selectedUser)
     socket.on("room",room=>{
     sessionStorage.setItem("room", room);
     })
     RemoveMessages()
     populateMessages(selectedUser);
  });
   

  button.addEventListener("click", () => {

    const msg = input.value.trim();
   let room  = sessionStorage.getItem("room")
    if (!room) {
    console.log("room not defined");
    return;
  }
    if (msg) {
      socket.emit("chat", {
        senderId: currentUser,
        receiverid:selectedUser,
        groupId:null,
        room,
        text: msg,
      });
      input.value = "";
    } 
  });


  socket.on("chat", (msg) => {
    const li = document.createElement("li");
    
    if (currentUser !== msg.senderId) {
    li.classList.add("left");   
      
  }
  else{
     li.classList.add("right"); 
  }
  li.textContent = `${msg.senderId}: ${msg.text}`;
    chatList.appendChild(li )
  });

  socket.on("reconnect", () => {
  if (currentUser) {
    socket.emit("assign", currentUser);
    console.log("Reconnected and reassigned:", currentUser);
  }
});
}
