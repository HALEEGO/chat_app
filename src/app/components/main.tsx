import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="root">
      <div>hello</div>
      <Link to="talk">
        <button type="button">방만들기</button>
      </Link>
      <Link to="talk">
        <button type="button">참여하기</button>
      </Link>
    </div>
  );
}

export default Main;
