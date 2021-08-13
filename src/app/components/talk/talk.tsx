import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import sjIP from '../../utils/constant/server';
import Chat from './components/chatlog';
import Msg from './components/chatbox';
import Member from './components/participantList';

const Talk = (props: any) => {
  const sockJS = new SockJS(`${sjIP}/chat`);
  const stompClient = Stomp.over(sockJS);
  // 웹소켓 연결할 주소를 stompClient 변수에 넣어둠
  const [click, setClick] = useState(1);
  const [message, setMessage] = useState('');
  const { location } = props;

  function clicking() {
    setClick((prior) => prior + 1);
  }

  function sendInfo() {
    stompClient.send(
      '/app/usermove',
      {},
      JSON.stringify({ roomID: location.state.number, userName: location.state.hi }),
    );
  }

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/usermove/${location.state.number}/HOST`, (greeting) => {
        const newMessage = JSON.parse(greeting.body); // roomID, userName, meessageType, moveType, role, context
        setMessage(newMessage.roomID);
      });
    });
  }, [click]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          sendInfo();
          clicking();
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

export default Talk;
