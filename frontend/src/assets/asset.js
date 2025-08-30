import bgImage from './bgImage.png'
import logo from './logo.png'
import logoIcon from './logoIcon.png'
import avatarIcon from './avatarIcon.png'
import pic1 from './pic1.png'
import pic2 from './pic2.png'
import pic3 from './pic3.png'
import pic4 from './pic4.png'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import profile_james from './profile_james.png'
import profile_anna from './profile_anna.png'
import profile_emily from './profile_emily.png'
import profile_david from './profile_david.png'
import profile_sophia from './profile_sophia.png'

export const imagesDummyData = [pic1, pic2, pic3, pic4, pic1, pic2]


const assets = {
    bgImage,
    logo,
    logoIcon,
    avatarIcon,
    profile_james,
    pic1,
    pic2, pic3, pic4, img1, img2
}

export default assets


export const userDummyData = [
    {
        "_id": "433444",
        "email": "james.brown@gmail.com",
        "fullName": "James Brown",
        "profilePic": profile_james,
        "bio": "Excited to connect with friends on Hallo-Chat!"
    },
    {
        "_id": "433445",
        "email": "sophia.wilson@gmail.com",
        "fullName": "Sophia Wilson",
        "profilePic": profile_sophia,
        "bio": "Hallo-Chat makes staying in touch so easy!"
    },
    {
        "_id": "433446",
        "email": "david.lee@gmail.com",
        "fullName": "David Lee",
        "profilePic": profile_david,
        "bio": "Always online, let’s chat on Hallo-Chat."
    },
    {
        "_id": "433447",
        "email": "emily.clark@gmail.com",
        "fullName": "Emily Clark",
        "profilePic": profile_emily,
        "bio": "Loving the new Hallo-Chat experience!"
    },
    {
        "_id": "433448",
        "email": "anna.johnson@gmail.com",
        "fullName": "Anna Johnson",
        "profilePic": profile_anna,
        "bio": "Hallo-Chat is my favorite way to keep in touch."
    }
]

export const messagesDummyData = [
    {
        "_id": "897880",
        "senderId": "338233",
        "receiverId": "263733",
        "text": "I’m doing great, thanks for asking! How about you?",
        "seen": true,
        "createdAt": "2025-07-12T23:05:10.120Z"
    },
    {
        "_id": "897881",
        "senderId": "433444",
        "receiverId": "338233",
        "text": "I’m fine too. Just had a long day at work.",
        "seen": true,
        "createdAt": "2025-07-12T23:06:45.332Z"
    },
    {
        "_id": "897882",
        "senderId": "338233",
        "receiverId": "263733",
        "text": "I can imagine. Did you finish your project?",
        "seen": true,
        "createdAt": "2025-07-12T23:08:12.220Z"
    },
    {
        "_id": "897883",
        "senderId": "263733",
        "receiverId": "338233",
        "text": "Yes, finally! It was so stressful though.",
        "seen": true,
        "createdAt": "2025-07-12T23:09:30.544Z"
    },
    {
        "_id": "897884",
        "senderId": "433444",
        "receiverId": "263733",
        "text": "Congrats 🎉 You deserve a break this weekend.",
        "seen": true,
        "createdAt": "2025-07-12T23:10:52.876Z"
    },
    {
        "_id": "897885",
        "senderId": "263733",
        "receiverId": "338233",
        "text": "Thanks! Do you have any plans for the weekend?",
        "seen": true,
        "createdAt": "2025-07-12T23:12:01.112Z"
    },
    {
        "_id": "897886",
        "senderId": "338233",
        "receiverId": "263733",
        "text": "Not really. Maybe just relax at home. You?",
        "seen": true,
        "createdAt": "2025-07-12T23:13:40.661Z"
    },
    {
        "_id": "897887",
        "senderId": "263733",
        "receiverId": "338233",
        "text": "I might go hiking if the weather is good.",
        "seen": false,
        "createdAt": "2025-07-12T23:15:05.441Z"
    },
    {
        "_id": "897888",
        "senderId": "338233",
        "receiverId": "263733",
        "text": "That sounds fun! Don’t forget to take pictures.",
        "seen": false,
        "createdAt": "2025-07-12T23:16:55.721Z"
    },
    {
        "_id": "897889",
        "senderId": "263733",
        "receiverId": "338233",
        "text": "For sure 😃 I’ll share them with you here.",
        "seen": false,
        "createdAt": "2025-07-12T23:18:23.004Z"
    }
]
