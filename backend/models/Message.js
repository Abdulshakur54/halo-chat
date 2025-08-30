import {Schema, model} from 'mongoose'
const messageSchema = new Schema({
    senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    receiverId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: String,
    image: String,
    imageId: String,
    seen: {type: Boolean, default: false}
}, {timestamps: true})

export default model('Message', messageSchema)