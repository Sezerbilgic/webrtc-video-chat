'use client'
import React, { createContext, useRef } from 'react'
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { v4 } from "uuid"
import { useRouter } from 'next/navigation';

const socket = io('https://videocallserver-gozg.onrender.com/')

type ContextType = {
  myStream?: MediaStream
  userStream?: MediaStream
  socket: typeof socket,
  rooms: Array<Rooms>
  stream?: MediaStream
  myVideo: React.MutableRefObject<any>
  connectionVideo: React.MutableRefObject<any>,
  callUser: (data: { userName: string | null, userId: string | null, calledId: string }) => void
  joinRoom: (data: { roomSignal: Peer.SignalData, roomId: string, userId: string | null, userName: string | null }) => void,
  isAnswer: boolean
}

export const SocketContext = createContext<ContextType>({
  socket,
  rooms: [],
  stream: undefined,
  myVideo: { current: null },
  connectionVideo: { current: null },
  callUser: (data) => { },
  joinRoom: (data) => { },
  isAnswer: false
});

type Rooms =
  { creatorUserName: string, creatorUserId: string, calledId: string, roomId: string, creatorSignal: Peer.SignalData }



const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [localId, setLocalId] = React.useState<string | null>(window.localStorage.getItem("id"))
  const [rooms, setRooms] = React.useState<Array<Rooms>>([])
  const [stream, setStream] = React.useState<MediaStream>()
  const [isAnswer, setIsAnswer] = React.useState<boolean>(false)
  const [me, setMe] = React.useState<string>("")
  const [myStream, setMyStream] = React.useState<MediaStream>()
  const [userStream, setUserStream] = React.useState<MediaStream>()
  const myVideo = useRef<HTMLVideoElement>(null);
  const connectionVideo = useRef<HTMLVideoElement>(null);
  // const connectionRef = useRef();
  console.log(myVideo, "Context")
  const router = useRouter()
  console.log(me)
  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        setMyStream(currentStream)
/*         if (myVideo.current && currentStream) {
          myVideo.current.srcObject = currentStream;
          console.log(currentStream, myVideo, "me")
        } */
      });

    socket.on('me', (id) => setMe(id));

  }, []);

  const enterRoom = (id: string) => {
    router.push(`/${id}`)

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        setMyStream(currentStream)
        // if (myVideo.current && currentStream)
        // myVideo.current.srcObject = currentStream;

      });
  }

  const getRooms = (roomData: Array<Rooms>) => {
    setRooms(roomData)
  }

  const joinRoom = ({ roomSignal, roomId, userId, userName }: { roomSignal: Peer.SignalData, roomId: string, userId: string | null, userName: string | null }) => {
    setIsAnswer(true)
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log(data)
      socket.emit('joined-room', { signalData: data, roomId, userId, userName });
    });

    peer.on('stream', (currentStream) => {
      console.log(currentStream)
      setUserStream(currentStream)
      // if (connectionVideo.current && currentStream) {
      // connectionVideo.current.srcObject = currentStream;
      // }
    });
    console.log(roomSignal)
    peer.signal(roomSignal);

    // connectionRef.current = peer;

    router.push(`/${roomId}`)
  }

  const callUser = (callData: { userName: string | null, userId: string | null, calledId: string }) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit("create-room", { ...callData, ...{ signalData: data, creatorSocketId: me } })
    });

    peer.on('stream', (currentStream) => {
      setUserStream(currentStream)
      // if (connectionVideo.current && currentStream) {
      // connectionVideo.current.srcObject = currentStream;
      // }
    });

    socket.on('user-joined', (signal) => {
      setIsAnswer(true)

      peer.on('stream', (currentStream) => {
        setUserStream(currentStream)
        // if (connectionVideo.current && currentStream) {
        // connectionVideo.current.srcObject = currentStream;
        // }
      });

      peer.signal(signal.signalData);
    });

    // connectionRef.current = peer;
  }

  React.useEffect(() => {
    if (!localId) {
      const id = v4()
      setLocalId(id)
      window.localStorage.setItem("id", id)
    }
  }, [localId])

  React.useEffect(() => {


    socket.on("room-added", getRooms)
    socket.on("room-created", enterRoom)
  })

  return (
    <SocketContext.Provider value={{
      socket,
      rooms,
      stream,
      myVideo,
      connectionVideo,
      callUser,
      joinRoom,
      isAnswer,
      myStream,
      userStream
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default ContextProvider