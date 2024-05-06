'use client'
import React from 'react'

const Header = () => {
  const [id, setId] = React.useState<string | null>(window !== undefined ? window.localStorage.getItem("id") : "")
  const [name, setName] = React.useState<string | null>(window !== undefined ? localStorage.getItem("name") : "")

  React.useEffect(() => {
    if ((window !== undefined ? window.localStorage.getItem("id") : "") !== id) {
      setId((window !== undefined ? window.localStorage.getItem("id") : ""))
    }
  }, [(window !== undefined ? window.localStorage.getItem("id") : "")])

  React.useEffect(() => {
    if (window !== undefined ? localStorage.getItem("name") : "" !== name) {
      setName(window !== undefined ? localStorage.getItem("name") : "")
    }
  }, [window !== undefined ? localStorage.getItem("name") : ""])

  return (
    <div className='header'>
      <div>
        Kullanıcı ID: {id}
      </div>
      {
        name &&
        <div>
          Kullanıcı Adı: {name}
        </div>
      }
    </div>
  )
}

export default Header