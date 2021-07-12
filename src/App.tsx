import React, { useState } from 'react';
import * as StompJs from '@stomp/stompjs';

const client = new StompJs.Client({
  brokerURL: '/gs-guide-websocket',
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// const { Stomp } = StompJs;
// client.onConnect = (frame) => {
//   let client = Stomp.over(() => new WebSocket('/gs-guide-websocket'));
// };

const App = () => {
  const [chatMessages, setChatMessages] = useState([]);
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
    // eslint-disable-next-line no-unused-vars
    const subscription = client.subscribe('/topic/greetings', (greeting) => {
      setChatMessages(JSON.parse(greeting.body).content);
    });
  }

  function sendName() {
    client.publish({ destination: '/app/hello', body: JSON.stringify(message) });
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
