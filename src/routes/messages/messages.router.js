import express from "express"
import { messagesController } from "../../controllers/message.controller.js"
const messagesRouter = express.Router()

messagesRouter.get("messages",messagesController)

export default messagesRouter