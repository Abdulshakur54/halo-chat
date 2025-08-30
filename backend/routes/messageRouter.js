import { Router } from "express";
import { getMessages, getUsersForSidebar, sendMessage, updateMessageAsSeen, updateMessagesAsSeen } from "../controllers/messageController.js";

const router = Router()

router.get('/users', getUsersForSidebar)
router.get('/:id', getMessages)
router.put('/mark/:id', updateMessageAsSeen)
router.put('/mark', updateMessagesAsSeen)
router.post('/send/:id', sendMessage)

export { router as messageRouter }