'use client'
import React from 'react'

const Header = () => {
  const [id, setId] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (localStorage.getItem("id") !== id) {
      setId(localStorage.getItem("id"))
    }
  }, [id])

  React.useEffect(() => {
    if (localStorage.getItem("name") !== name) {
      setName(localStorage.getItem("name"))
    }
  }, [name])

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