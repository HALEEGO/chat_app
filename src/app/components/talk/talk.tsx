import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import sjIP from '../../utils/constant/server';
import Chat from './components/chatlog';
import Msg from './components/chatbox';
import Member from './components/participantList';
// import sjIP from '../utils/constant/server';
let stompClient: Stomp.Client;
let sockJS: WebSocket;



const Talk = (props: any) => {

  const [click, setClick] = useState(1);
  const [message, setMessage] = useState('');
  const { location } = props;

  function sendInfo() {
    stompClient.send(
      '/app/hello',
      {},
      JSON.stringify({ roomID: location.state.number, user: { userName: location.state.hi } }),
    );
  }

  useEffect(() => {
    sockJS = new SockJS(`http://localhost:8080/chat`);
    stompClient = Stomp.over(sockJS);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/greetings`, (greeting) => {
        const newMessage = JSON.parse(greeting.body); // roomID, userName, meessageType, moveType, role, context
        setMessage(newMessage.roomID);
      });
      sendInfo();
    });
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          sendInfo();
        }}
      >
        send
      </button>
      메시지: {message}
      <h1>Byung50s TalkRoom</h1>
      {Member()}
      {Chat()}
      <h1>(❁´o`❁)</h1>
      {Msg()}
    </div>
  );
};

export default React.memo(Talk);
