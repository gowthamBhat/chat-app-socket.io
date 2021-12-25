import './App.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid' //to create unique id's
import LocalStroageContainer from './LocalStroageContainer'
require('dotenv').config()

//dotenv can be used here
const socket = io('http://localhost:5500') //backend socket servr URL
let userName = null
try {
  const currentUser = LocalStroageContainer.getCurrentUser()
  userName = currentUser.name
} catch (er) {
  userName = nanoid(4)
}

//event emit method

function App() {
  const [message, setMessage] = useState('') //store a single message response
  const [chat, setChat] = useState([]) //to store all the messages
  // const [currentUser, setCurrentUser] = useState(null)
  // useEffect(() => {
  //   setCurrentUser(LocalStroageContainer.getCurrentUser())
  // }, [])
  // userName = currentUser.name
  const sendChat = (e) => {
    e.preventDefault()

    socket.emit('chat', { message, userName }) //{message:message}

    setMessage('') //reseting the textbox
  }
  useEffect(() => {
    //upading the chat state after emiting an event
    socket.on('chat', (payload) => {
      setChat([...chat, payload])
    })
  })
  // console.log(chat)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Foodies Chat</h1>

        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {' '}
              {payload.message} <span>{payload.userName}</span>
            </p>
          )
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  )
}

export default App
