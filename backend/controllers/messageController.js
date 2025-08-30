import { Schema } from "mongoose"
import { cloudinary } from "../lib/cloudinary.js"
import Message from "../models/Message.js"
import User from "../models/User.js"
import y from 'yup'
import { stext } from "../lib/validator.js"
import {io, userSocketMap} from './../server.js'

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id
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
        res.status(200).json({ success: true, data: {users: otherUsers, unseenMessages} })

    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: selectedId } = req.params;
        if (!selectedId instanceof Schema.Types.ObjectId)
            return res.status(400).json({ success: false, message: "Invalid ID" })
        // get all chat messages
        const messages = await Message.find({
            $or: [
                { senderId: selectedId, receiverId: req.user._id },
                { senderId: req.user._id, receiverId: selectedId },
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
        if (!selectedId instanceof Schema.Types.ObjectId)
            return res.status(400).json({ success: false, message: "Invalid ID" })
        await Message.updateMany({ senderId: selectedId, receiverId: req.user._id }, { seen: true });
        res.status(204).json({ success: true })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

export const updateMessageAsSeen = async (req, res) => {
    try {
        const id = req.params.id
        if (!id instanceof Schema.Types.ObjectId)
            return res.status(400).json({ success: false, message: "Invalid ID" })
        await Message.findByIdAndUpdate(id, { seen: true })
        res.status(204).json({ success: true })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const id = req.params.id
        if (!id instanceof Schema.Types.ObjectId)
            return res.status(400).json({ success: false, message: "Invalid ID" })
        const { image, text } = req.body
        const schema = y.object({
            text: stext
        })
        const {text: txt} = await schema.validate({ text })
        const uploadRes = await cloudinary.uploader.upload(image)
        const { secure_url, public_id } = uploadRes
        const newMessage = await Message.create({ senderId: req.user._id, receiverId: id, text: txt, image: secure_url, imageId: public_id })
        if(id in userSocketMap){
            io.to(userSocketMap[id]).emit('newMessage', newMessage)
        }
        res.status(204).json({ success: true, data: {message: newMessage} })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

