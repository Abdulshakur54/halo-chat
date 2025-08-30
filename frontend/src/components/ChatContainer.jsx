import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/asset'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faFileImport, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { formatMessageTime } from '../libs/utils'

function ChatContainer({ selectedUser, setSelectedUser }) {
  const scrollEnd = useRef()
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*----- header-------*/}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_james} alt='' className='w-8 rounded-full ' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          James Brown
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.logo} alt="" className='md:hidden max-w-7' />
        <FontAwesomeIcon icon={faCircleInfo} className='max-md:hidden max-w-5 text-gray-500' />
      </div>
      {/*----- chat area-------*/}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messagesDummyData.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== "433444" && "flex-row-reverse"}`}>
            {msg.image ? (
              <img src={msg.image} alt='' className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '433444' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === '433444' ? assets.avatarIcon : assets.profile_james} alt='' className='w-7 rounded-full' />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/*----- bottom area-------*/}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <textarea rows="1" placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
          <input type='file' id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor='image'>
            <FontAwesomeIcon icon={faFileImport} className='w-5 mr-2 cursor-pointer text-gray-500' />
          </label>
        </div>
        <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer'>

          <FontAwesomeIcon icon={faPaperPlane} className='text-white text-xs' />
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