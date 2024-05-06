'use client'
import React, { useContext } from 'react'
import { VideoChat } from '../components'

import { SocketContext } from '../context/Context'

const Room = () => {
  const { isAnswer } = useContext(SocketContext)
  return (
    <div className='room'>
      {
        !isAnswer ?
          <div className='waiting'>
            Aramaya Katılması Bekleniyor...
          </div>
          : <VideoChat />
      }
    </div>
  )
}

export default Room