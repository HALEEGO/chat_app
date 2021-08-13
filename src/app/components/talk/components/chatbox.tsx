import React from 'react';

export default function Msg() {
  function SendMsg() {}
  return (
    <div>
      <input type="text" />
      <button type="button" onClick={SendMsg}>
        enter
      </button>
    </div>
  );
}
