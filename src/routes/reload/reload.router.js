 import express from "express"
import { reload } from "../../controllers/reload.controller.js";

 const reloadRouter=express.Router()

 reloadRouter.get("/",reload)

  export default reloadRouter