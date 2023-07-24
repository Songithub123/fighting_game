//import React, {useState} from 'react';

export default function App() {
  return (
    <div id="big-container">
      <label htmlFor="Wizard-level"> Wizard level: </label>
      <input type="number" className="Wizard-level" value={1} />
      <label htmlFor="Knight-level"> Knight level: </label>
      <input type="number" className="Knight-level" value={1} />
      <button id="start-battle-btn" >Start battle</button>
      <div id="game-container" >
        <div className="screen" >
          <img src="" alt="" />
        </div>
        <div className="control" >

        </div>
      </div>
      <div className="computer-narration" ></div>
    </div>
  );
}
