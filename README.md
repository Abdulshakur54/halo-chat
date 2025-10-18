# 💬 Hallo Chat

Hallo Chat is a real-time chat application that enables users to communicate seamlessly via text and images.  
It supports secure authentication, profile management, and live messaging powered by WebSockets.  

---

## 🚀 Features

### 🧠 Core Functionality
- **Real-Time Chat** — Instant peer-to-peer messaging via WebSockets.  
- **Image Messages** — Users can upload and share images in chat.  
- **Profile Management** — Update user details and profile photos easily.  
- **Authentication System** — Sign up, log in, and reset passwords securely.  
- **Password Reset** — Reset forgotten passwords via email verification.  
- **Contact Us Page** — Users can reach out with inquiries or feedback.  
- **Emailing Functionality** — Implemented with the [Speakeasy](https://www.npmjs.com/package/speakeasy) library for OTP and verification flows.  

---

## 🧩 Tech Stack

### **Frontend**
- ⚛️ **React** — Component-based UI library.  
- 🌐 **React Router DOM** — Client-side routing and navigation.  
- ☁️ **Cloudinary** — Image storage, optimization, and on-the-fly resizing.  
- 🧾 **Formik + Yup** — Form handling and validation.  
- ⚡ **WebSockets** — Real-time communication.

### **Backend**
- 🟢 **Node.js** — JavaScript runtime for the backend.  
- 🧱 **Express.js** — RESTful API framework.  
- 🍃 **MongoDB** — NoSQL database for storing user and chat data.  
- ☁️ **Cloudinary** — Image hosting and processing.  
- 📧 **Speakeasy** — Used for OTP and secure email verification.  

---

## 🗄️ Project Structure

```
hallo-chat/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/         # Static assets (icons, images, etc.)
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React context providers (Auth, Chat)
│   │   ├── pages/          # Application pages (Login, Chat, Profile, etc.)
│   │   ├── utils/          # Helper functions
│   │   └── App.js          # App entry point
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/             # Configuration files (DB, Cloudinary, etc.)
│   ├── controllers/        # Request controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── sockets/            # WebSocket logic
│   ├── utils/              # Helper utilities
│   ├── server.js           # Entry point
│   └── package.json
│
└── README.md
`
