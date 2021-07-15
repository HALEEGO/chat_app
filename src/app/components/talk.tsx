import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const sockJS = new SockJS('http://localhost:8080/chat');
const stompClient = Stomp.over(sockJS);

const Talk = (props: any) => {
  // const [chatMessages, setChatMessages] = useState(['hello', 'nice']);
  const [message, setMessage] = useState('');
  // const location = useLocation();
  // const name = location.state;
  console.log(props);
  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/greetings', (greeting) => {
        const newMessage = greeting.body;
        setMessage(newMessage);
        setMessage(message);
      });
    });
    // stompClient.send('/app/hello', {}, );
  });

  return <div>씨발 왜안댐{props.location.state}</div>;
};

export default Talk;
