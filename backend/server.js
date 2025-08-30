import express from 'express'
import { createServer } from 'node:http'
import "dotenv/config"
import cors from 'cors'
import { connectDB } from './lib/db.js'
import { authRouter } from './routes/authRoute.js'
import { messageRouter } from './routes/messageRouter.js'
import { authenticate } from './middlewares/auth.js'
import { Server } from 'socket.io'
import { userRouter } from './routes/userRoute.js'


const app = express()
const server = createServer(app)
export const io = new Server(server, {
    cors: { origin: "*" }
})

app.use(express.json({ limit: '4mb' }))
app.use(cors())

await connectDB()

export const userSocketMap = {}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    if (userId) {
        console.log('User connected ', userId)
        userSocketMap[userId] = socket.id
        // emit online users to all connected client
        io.emit('onlineUsers', Object.keys(userSocketMap))
        socket.on('disconnect', ()=>{
            console.log('User disconnected ', userId)
            delete userSocketMap[userId]
            socket.emit('onlineUsers', Object.keys(userSocketMap))
        })
    }
})

app.get('/api/status', (req, res) => {
    res.send('Server is live')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', authenticate, messageRouter)
app.use('/api/v1/users', authenticate, userRouter)

const port = process.env.PORT || 3000
server.listen(port, () => { console.log(`Server is listening at port ${port}`) })