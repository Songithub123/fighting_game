//import React, {useState} from 'react';
import background from './image/background/_4cb0c1d7-f6dd-489b-82bd-403af6db5a40.jpg'
import enemyImage from './image/wizard-front.png'
import playerImage from './image/wizard-back 2.png'

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
          <img src={background} alt="" />
          <div className='enemy' >
            <img src={enemyImage} alt="" />
          </div>
          <div className='player' >
            <img src={playerImage} alt="" />
          </div>
        </div>
        <div className="control" >

        </div>
      </div>
      <div className="computer-narration" ></div>
    </div>
  );
}
