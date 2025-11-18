 import express from "express"
 import { getUsers,signup } from "../../controllers/user.controller.js"
 
 const usersRouter=express.Router()
usersRouter.get("/",getUsers)
usersRouter.post("/signup",signup)

 export default usersRouter