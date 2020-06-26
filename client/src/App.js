import React, { useEffect, useContext } from 'react';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';

import Mixer from 'components/Mixer/Mixer';
import ReverbSenders from 'components/ReverbSenders/ReverbSenders';
import DistortionSenders from 'components/DistortionSenders/DistortionSenders';
// import PingPongSenders from 'components/PingPongSenders/PingPongSenders';
// import PingPongControl from 'components/PingPongControl/PingPongControl';
import PingPong from 'components/PingPong/PingPong';
import ReverbControl from 'components/ReverbControl/ReverbControl';

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
        <PingPong />
        {/* <div className='flex'>
          <PingPongSenders />
          <PingPongControl />
        </div> */}
        <DistortionSenders />

        <div className='flex'>
          <ReverbSenders />
          <ReverbControl />
        </div>
      </div>
    </div>
  );
}

export default App;
