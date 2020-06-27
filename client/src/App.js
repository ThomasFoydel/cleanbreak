import React, { useEffect, useContext } from 'react';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';

import Mixer from 'components/Mixer/Mixer';
import Distortion from 'components/Distortion/Distortion';
import PingPong from 'components/PingPong/PingPong';
import Reverb from 'components/Reverb/Reverb';

function App() {
  const [appState, updateState] = useContext(CTX);

  useEffect(() => {
    window.addEventListener('mousedown', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: true });
    });
    window.addEventListener('mouseup', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: false });
    });
  }, []);

  return (
    <div className='App '>
      <div className='background'></div>
      <div className='components-container'>
        <StepSequencer />
        <Mixer />
        <Distortion />
        <PingPong />
        <Reverb />
      </div>
    </div>
  );
}

export default App;
