import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// const { Stomp } = StompJs;
// client.onConnect = (frame) => {
//   let client = Stomp.over(() => new WebSocket('/gs-guide-websocket'));
// };
let stompClient: Stomp.Client;

const App = () => {
  const [chatMessages, setChatMessages] = useState(['hello', 'nice']);
  const [message, setMessage] = useState('');
  const [isConnect, setConnect] = useState(false);

  function onConnect() {
    const sockJS = new SockJS('http://localhost:8080/chat');
    stompClient = Stomp.over(sockJS);
    setConnect(true);
  }

  function sendName() {
    stompClient.send('/app/hello', {}, message);
  }

  useEffect(() => {
    if (!isConnect) {
      return;
    }
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/greetings', (greeting) => {
        const newMessage = greeting.body;
        setChatMessages((prev) => [...prev, newMessage]);
      });
    });
  }, [chatMessages, isConnect]);

  return (
    <div>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              onConnect();
            }}
          >
            connect
          </button>
        </li>
        <li>
          <button type="button" onClick={() => {}}>
            disconnect
          </button>
        </li>
      </ul>
      <div>
        <input type="text" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          type="button"
          onClick={() => {
            sendName();
            setMessage('');
          }}
        >
          send
        </button>
      </div>
      <div>출력화면</div>
      <ul>
        {chatMessages.map((result, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
