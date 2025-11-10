import {User} from "../models/user.model.js"
const defaultUsers=[{
    username:"Rajnish"
},{
    username:"manish"
},{
    username:"jack"
},
]

export async function loaduser() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany(defaultUsers);
      console.log("✅ Default users inserted:", defaultUsers);
    } else {
      console.log("✅ Users already exist in DB");
    }
  } catch (err) {
    console.error("❌ Error loading users:", err);
  }
}