import { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/asset'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faPaperPlane, faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../contexts/ChatContext'
import { AuthContext } from '../contexts/authContext'
import { toast } from '../lib/utils'
import Image from './CloudinaryImage'

function ChatContainer() {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)
  const [input, setInput] = useState('')
  const scrollEnd = useRef()
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === '') {
      return null
    }
    await sendMessage({ text: input.trim() })
    setInput('')
  }

  const handleSendImage = async (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith('image/')) {
      toast.error('select an image file')
      return
    }
    const formData = new FormData()
    formData.append('imageMsg', file)
    await sendMessage(formData)
  }
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*----- header-------*/}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>

        {selectedUser?.profilePicId ? <Image src={selectedUser?.profilePicId} alt='' className='w-8 rounded-full ' /> :
          <img src={assets.avatarIcon} alt='' className='w-8 rounded-full ' /> }
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
        </p>
        <FontAwesomeIcon icon={faCircleLeft} onClick={() => setSelectedUser(null)} className='md:hidden max-w-7 text-gray-500' />
        {/* <FontAwesomeIcon icon={faCircleInfo} className='max-md:hidden max-w-5 text-gray-500' /> */}
      </div>
      {/*----- chat area-------*/}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && "flex-row-reverse"}`}>
            {msg.imageId ? (
              <Image className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' src={msg.imageId} />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              {(msg.senderId === authUser._id) ? (authUser?.profilePicId ? <Image src={authUser.profilePicId} alt='' className='w-7 rounded-full' /> : <img src={assets.avatarIcon} alt='' className='w-7 rounded-full' />) :
                (selectedUser?.profilePicId ? <Image src={selectedUser.profilePicId} alt='' className='w-7 rounded-full' /> : <img src={assets.avatarIcon} alt='' className='w-7 rounded-full' />)}

              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/*----- bottom area-------*/}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <textarea rows="1" placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
            onChange={(e) => { setInput(e.target.value) }}
            value={input} onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage(e) : null}
          />
          <input type='file' id='image' accept='image/png, image/jpeg' hidden onChange={handleSendImage} />
          <label htmlFor='image'>
            <FontAwesomeIcon icon={faFileImport} className='w-5 mr-2 cursor-pointer text-gray-500' />
          </label>
        </div>
        <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110'>

          <FontAwesomeIcon icon={faPaperPlane} className='text-white text-xs' onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logoIcon} alt='' className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer