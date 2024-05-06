import { SocketContext } from '@/app/context/Context'
import React, { useContext } from 'react'
import Peer from 'simple-peer';

type RoomCard =
  { creatorUserName: string, creatorUserId: string, calledId: string, roomId: string, creatorSignal: Peer.SignalData }


const RoomCard = (props: RoomCard) => {
  const { joinRoom } = useContext(SocketContext)

  const handleClick = () => {
    const data = {
      roomSignal: props.creatorSignal,
      roomId: props.roomId,
      userId: window.localStorage.getItem("id"),
      userName: window.localStorage.getItem("name")
    }

    joinRoom(data)
  }

  return (
    <div onClick={handleClick} className='room-card'>
      <div className='card-header'>
        Görüşme Yapmak İsteyen
      </div>
      <div>
        {props.creatorUserName}
      </div>
    </div>
  )
}

export default RoomCard