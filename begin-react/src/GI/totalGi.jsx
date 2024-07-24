import React, { useState, useEffect } from 'react';
import GIdonut from './GIdonut.png';
import './totalGI.css';

function App() {
  return (
    <div>
      <div>
        <h1>2024년 7월 28일</h1>
      </div>
      <div className="donuttext">
        <div className="donutimage">
          <img src={GIdonut} />
        </div>
        <div className="textdonut">
          <h1>오늘 먹은 총</h1>
          <h1>GI</h1>
        </div>
        <div>
          <h1>
            {' '}
            내가 깜박한 게 있는데 이거 아침/점심/저녁/간식으로나눠서만들어야하네
            ㅋㅋ..맞당!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
