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
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/hallo-chat.git
cd hallo-chat
```

### 2. Install dependencies
#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd ../server
npm install
```

### 3. Configure Environment Variables
Create `.env` files in both the `client` and `server` directories.

#### **Client `.env`**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

#### **Server `.env`**
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4. Run the app
#### Start the backend
```bash
cd server
npm run dev
```

#### Start the frontend
```bash
cd client
npm run dev
```

---

## 🧠 How It Works

1. **Authentication**  
   Users register, verify via email, and log in securely with JWT tokens.

2. **Messaging**  
   WebSockets power the real-time chat experience, enabling instant message delivery and read receipts.

3. **Media Handling**  
   Uploaded images are stored in Cloudinary and optimized dynamically before rendering.

4. **Profile Management**  
   Users can edit their information and change their profile photos.

5. **Contact Form**  
   Messages from users are sent to administrators for follow-up.

---

## 🧰 Scripts

| Command | Description |
|----------|--------------|
| `npm run dev` | Runs the development server |
| `npm run build` | Builds the production-ready frontend |
| `npm start` | Runs the backend in production mode |

---

## 🖼️ Screenshots

*(Add your app screenshots here — login, chat screen, profile, etc.)*

---

## 🛡️ Security & Best Practices
- All passwords are hashed before storage.  
- JWT tokens are used for authentication and authorization.  
- Environment variables protect sensitive credentials.  
- Cloudinary ensures secure image hosting.  

---

## 💡 Future Improvements
- Add group chat functionality.  
- Enable message reactions and typing indicators.  
- Add push notifications.  
- Introduce dark/light mode themes.

---

## 🧑‍💻 Author

**Akinbiyi Akindoyin**  
💼 [LinkedIn](https://linkedin.com/in/akinbiyi-akindoyin)  
📧 [Email](mailto:your-email@example.com)  
🌐 [Portfolio](https://your-portfolio-link.com)

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

### ⭐ If you like this project, give it a star on GitHub!
