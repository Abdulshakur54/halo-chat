import { Router } from "express";
import { getMessages, getUsersForSidebar, sendMessage, updateMessageAsSeen, updateMessagesAsSeen } from "../controllers/messageController.js";
import upload from "../lib/multer.js";

const router = Router()

router.get('/users', getUsersForSidebar)
router.get('/:id', getMessages)
router.put('/mark/:id', updateMessageAsSeen)
router.put('/marks/:id', updateMessagesAsSeen)
router.post('/send/:id', upload.single('imageMsg'), sendMessage)

export { router as messageRouter }