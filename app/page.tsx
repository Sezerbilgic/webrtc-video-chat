'use client'
import React, { useContext } from "react"
import Image from "next/image";
import { VideoChat } from "./components";
import styles from "./page.module.css";
import { SocketContext } from "./context/Context";
import RoomCard from "./components/RoomCard";
import Peer from 'simple-peer';

export default function Home() {
  const [callId, setCallId] = React.useState<string>("")
  const [callName, setCallName] = React.useState<string>("")
  const [hasName, setHasName] = React.useState<string | null>(window.localStorage.getItem("name"))
  const { socket, rooms, stream, connectionVideo, callUser: callUserContext } = useContext(SocketContext)
  const myCalls = rooms.filter(room => room.calledId === window.localStorage.getItem("id"))


  const saveName = (name: string) => {
    setHasName(name)
    window.localStorage.setItem("name", name)
  }

  const callUser = () => {
    const callUserData = {
      userName: window.localStorage.getItem("name"), userId: window.localStorage.getItem("id"), calledId: callId
    }

    callUserContext(callUserData)
  }

  return (
    <div className="home-page">
      {
        hasName ?
          <>
            <div style={{ color: "white" }}>
              {
                myCalls.length === 0 ?
                  <>
                    Herhangi bir görüşme talebi bulunmamaktadır.
                  </>
                  :
                  <div>
                    {
                      myCalls.map((room, index) => {
                        return (
                          <RoomCard key={index} {...room} />
                        )
                      }
                      )
                    }
                  </div>
              }
            </div>
            <div className="call-section">
              <input onChange={(e) => setCallId(e.target.value)} placeholder="Aranmak İstenen Kullanıcının ID'sini Girin"></input>
              <button onClick={callUser} >Görüşme Talebinde Bulun</button>
            </div>
          </>
          :
          <div className="call-section">
            <input onChange={(e) => setCallName(e.target.value)} placeholder="İsminizi Girin"></input>
            <button onClick={() => saveName(callName)} >Kaydet</button>
          </div>
      }
    </div>
  );
}
