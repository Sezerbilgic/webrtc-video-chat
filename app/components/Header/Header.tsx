'use client'
import React from 'react'

const Header = () => {
  const [id, setId] = React.useState<string | null>(window.localStorage.getItem("id"))
  const [name, setName] = React.useState<string | null>(window.localStorage.getItem("name"))

  React.useEffect(() => {
    if (window.localStorage.getItem("id") !== id) {
      setId(window.localStorage.getItem("id"))
    }
  }, [window.localStorage.getItem("id")])

  React.useEffect(() => {
    if (window.localStorage.getItem("name") !== name) {
      setName(window.localStorage.getItem("name"))
    }
  }, [window.localStorage.getItem("name")])

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