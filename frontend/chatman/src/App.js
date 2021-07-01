import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid'; //to create unique id's

//dotenv can be used here
const socket = io('http://localhost:5500'); //backend socket servr URL
const userName = nanoid(4);
//event emit method

function App() {
  const [message, setMessage] = useState(''); //store a single message response
  const [chat, setChat] = useState([]); //to store all the messages

  const sendChat = (e) => {
    e.preventDefault();

    socket.emit('chat', { message, userName }); //{message:message}

    setMessage(''); //reseting the textbox
  };
  useEffect(() => {
    //upading the chat state after emiting an event
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    });
  });
  console.log(chat);

  return (
    <div className="App">
      <header className="App-header">
        <h1>chatman</h1>

        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {' '}
              {payload.message} <span>id:{payload.userName}</span>
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
