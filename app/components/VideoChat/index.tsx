import { SocketContext } from '@/app/context/Context'
import React, { useContext } from 'react'
import VideoPlayer from './VideoPlayer'

const VideoChat = () => {
  const { myStream, userStream } = useContext(SocketContext)

  return (
    <div className='video-chat-container' >
      {
        myStream &&
        <VideoPlayer stream={myStream} />
      }
      <div className='small-container' >
        {
          userStream &&
          <VideoPlayer stream={userStream} />
        }
      </div>
    </div>
  )
}

export default VideoChat