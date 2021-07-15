import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import sjIP from '../utils/constant/server';

const Talk = (props: any) => {
  const [click, setClick] = useState(1);
  const sockJS = new SockJS(`${sjIP}/chat`);
  const stompClient = Stomp.over(sockJS);
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
    </div>
  );
};

export default Talk;
