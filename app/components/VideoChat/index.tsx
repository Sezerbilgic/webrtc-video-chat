import { SocketContext } from '@/app/context/Context'
import React, { useContext } from 'react'
import VideoPlayer from './VideoPlayer'

const VideoChat = () => {
  const { myStream, userStream } = useContext(SocketContext)
  const [focus, setFocus] = React.useState<"me" | "user">("user")

  return (
    <div className='video-chat-container' >
      {
        myStream && userStream &&
        <VideoPlayer stream={focus === "user" ? userStream : myStream } />
      }
      <div onClick={() => focus === "user" ? setFocus("me") : setFocus("user")} className='small-container' >
        {
          userStream && myStream &&
          <VideoPlayer stream={focus === "me" ? userStream : myStream } />
        }
      </div>
    </div>
  )
}

export default VideoChat