import React, { useContext } from 'react';
import Tempo from 'components/Tempo/Tempo';
import Swing from 'components/Swing/Swing';

import './StartStop.scss';
import { CTX } from 'context/Store';

const StartStop = () => {
  const [appState, updateState] = useContext(CTX);
  let { playing } = appState;

  const handleStart = () => {
    updateState({ type: 'START' });
  };
  const handleStop = () => {
    updateState({ type: 'STOP' });
  };
  return (
    <div className='start-stop'>
      <div className='tempo-swing'>
        <Tempo />
        <Swing />
      </div>
      <div className='buttons-container'>
        <div
          className={`play-triangle ${playing && 'playing'}`}
          onClick={handleStart}
        ></div>
        <div className='pause-container' onClick={handleStop}>
          <div className={`pause-button paused-${!playing}`}></div>
        </div>
      </div>
    </div>
  );
};

export default StartStop;
