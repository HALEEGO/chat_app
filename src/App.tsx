import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const App = () => {
  const [chatMessages, setChatMessages] = useState(['hello', 'nice']);
  const [message, setMessage] = useState('');
  const [connect, setConnect] = useState(false);

  let stompClient: Stomp.Client;

  function onConnect() {
    const sockJS = new SockJS('http://localhost:8080/gs-guide-websocket');
    stompClient = Stomp.over(sockJS);
    setConnect(true);
  }

  function sendName() {
    stompClient.send('/app/hello', {}, JSON.stringify({ name: message }));
  }

  useEffect(() => {
    if (!connect) {
      return;
    }
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/greetings', (greeting: any) => {
        const newMessage = JSON.parse(greeting.body);
        let a: string = newMessage.content;
        a = a.replace(',"', '');
        setChatMessages((prev) => [...prev, JSON.stringify(a)]);
      });
    });
  }, [chatMessages, connect]);

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
