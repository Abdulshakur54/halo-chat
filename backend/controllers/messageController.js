import mongoose from "mongoose"
import { cloudinary } from "../lib/cloudinary.js"
import Message from "../models/Message.js"
import User from "../models/User.js"
import y from 'yup'
import { stext, sobjectId } from "../lib/validator.js"
import { io, userSocketMap } from './../server.js'
import { uploadFile } from "../lib/helper.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        // get other users
        const otherUsers = await User.find({ _id: { $ne: userId } }).select("-password")
        const unseenMessages = {}
        const promises = otherUsers.map(async (user) => {
            const unseen = await Message.countDocuments({ senderId: user._id, receiverId: userId, seen: false })
            if (unseen > 0) {
                unseenMessages[user._id] = unseen
            }
        })
        await Promise.all(promises)
        res.status(200).json({ success: true, data: { users: otherUsers, unseenMessages } })

    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: e.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: selectedId } = req.params;
        const schema = y.object({ selectedId: sobjectId })
        const valData = await schema.validate({ selectedId })
        // get all chat messages
        const messages = await Message.find({
            $or: [
                { senderId: valData.selectedId, receiverId: req.user._id },
                { senderId: req.user._id, receiverId: valData.selectedId },
            ]
        })
        res.status(200).json({ success: true, data: { messages } })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }

}

export const updateMessagesAsSeen = async (req, res) => {
    try {
        const { id: selectedId } = req.params;
        const userId = req.user._id
        const schema = y.object({ selectedId: sobjectId, userId: sobjectId })
        const valData = await schema.validate({ selectedId, userId })
        await Message.updateMany({ senderId: valData.selectedId, receiverId: valData.userId }, { seen: true });
        res.status(200).json({ success: true })
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: e.message })
    }
}

export const updateMessageAsSeen = async (req, res) => {
    try {
        const { id: selectedId } = req.params;
        const schema = y.object({ selectedId: sobjectId })
        const valData = await schema.validate({ selectedId })
        await Message.findByIdAndUpdate(valData.selectedId, { seen: true })
        res.status(200).json({ success: true })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { id: selectedId } = req.params;
        let newMessage;
        if (req.file) {
            const schema = y.object({ selectedId: sobjectId })
            const valData = await schema.validate({ selectedId })
            const { secure_url, public_id } = await uploadFile(req.file)
            newMessage = await Message.create({ senderId: req.user._id, receiverId: valData.selectedId, image: secure_url, imageId: public_id })
        } else {
            const { text } = req.body
            const schema = y.object({ selectedId: sobjectId, text: stext })
            const valData = await schema.validate({ selectedId, text })
            newMessage = await Message.create({ senderId: req.user._id, receiverId: valData.selectedId, text: valData.text})
        }
        if (selectedId in userSocketMap) {
            io.to(userSocketMap[selectedId]).emit('newMessage', newMessage)
        }
        
        res.status(200).json({ success: true, data: { message: newMessage } })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: e.message })
    }
}

