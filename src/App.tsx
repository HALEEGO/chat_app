import React, { useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const sockJS = new SockJS('http://localhost:8080/gs-guide-websocket');
const stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

// const { Stomp } = StompJs;
// client.onConnect = (frame) => {
//   let client = Stomp.over(() => new WebSocket('/gs-guide-websocket'));
// };

const App = () => {
  const [chatMessages, setChatMessages] = useState(['hello', 'nice']);
  const [message, setMessage] = useState('');

  // const subscribe = () => {
  //   client.current.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }) => {
  //     setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
  //   });
  // };
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     // brokerURL: 'ws://localhost:8080/gs-guide-websocket', // 웹소켓 서버로 직접 접속
  //     webSocketFactory: () => new SockJS('/ws-stomp'), // proxy를 통한 접속
  //     connectHeaders: {
  //       'auth-token': 'spring-chat-auth-token',
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //     onConnect: () => {
  //       subscribe();
  //     },
  //   });

  //   client.current.activate();
  // };

  // const disconnect = () => {
  //   client.current.deactivate();
  // };

  // const publish = (message) => {
  //   if (!client.current.connected) {
  //     return;
  //   }

  //   client.current.publish({
  //     destination: '/pub/chat',
  //     body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
  //   });

  //   setMessage('');
  // };

  // useEffect(() => {
  //   connect();

  //   return () => disconnect();
  // }, []);

  function onConnect() {
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/greetings', (greeting) => {
        const newMessage = JSON.parse(greeting.body);
        setChatMessages((prev) => [...prev, newMessage]);
      });
    });
  }

  function sendName() {
    stompClient.send('/app/hello', {}, JSON.stringify({ name: { message } }));
  }

  return (
    <div>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              onConnect();
              console.log('hello');
            }}
          >
            connect
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              console.log('bye');
            }}
          >
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
        {chatMessages.map((result) => (
          <li>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
