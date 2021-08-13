import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {
  const [name, setName] = useState('');
  const [makeRoom, setMakeRoom] = useState(false);
  const [roomID, setRoomID] = useState('');
  const [participate, setParticipate] = useState(false);

  return (
    <div className="root">
      <div>
        <h1>🎉HALEEGO 채팅앱🎉</h1>
      </div>
      <div>
        <div>당신의 이름은?</div>
        <div>
          <input type="text" placeholder="이름은" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setMakeRoom(true);
          setParticipate(false);
          setRoomID('');
        }}
      >
        방만들기
      </button>
      {makeRoom ? (
        <div>
          <input type="text" placeholder="방 번호 입력" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
          <Link to={{ pathname: '/talk', state: { hi: name, number: roomID } }}>
            <button
              type="button"
              onClick={() => {
                setRoomID('');
              }}
            >
              send
            </button>
          </Link>
        </div>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={() => {
          setParticipate(true);
          setMakeRoom(false);
          setRoomID('');
        }}
      >
        참여하기
      </button>
      {participate ? (
        <div>
          <input type="text" placeholder="방 번호 입력" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
          <Link to="talk">
            <button
              type="button"
              onClick={() => {
                setRoomID('');
              }}
            >
              send
            </button>
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Main;
