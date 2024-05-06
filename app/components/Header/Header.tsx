'use client'
import React from 'react'

const Header = () => {
  const [id, setId] = React.useState<string | null>(localStorage.getItem("id"))
  const [name, setName] = React.useState<string | null>(localStorage.getItem("name"))

  React.useEffect(() => {
    if (localStorage.getItem("id") !== id) {
      setId(localStorage.getItem("id"))
    }
  }, [localStorage.getItem("id")])

  React.useEffect(() => {
    if (localStorage.getItem("name") !== name) {
      setName(localStorage.getItem("name"))
    }
  }, [localStorage.getItem("name")])

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