import React, { useEffect, useContext } from 'react';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';
import Tempo from 'components/Tempo/Tempo';
import Swing from 'components/Swing/Swing';
import Mixer from 'components/Mixer/Mixer';
import ReverbSenders from 'components/ReverbSenders/ReverbSenders';
import DistortionSenders from 'components/DistortionSenders/DistortionSenders';
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
  const handleStart = () => {
    updateState({ type: 'START' });
  };
  const handleStop = () => {
    updateState({ type: 'STOP' });
  };
  return (
    <div className='App '>
      <div className='background'></div>
      <div className='components-container'>
        <StepSequencer />
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <Tempo />
        <Swing />
        <ReverbControl />
        <DistortionSenders />
        <ReverbSenders />
        <Mixer />
      </div>
    </div>
  );
}

export default App;
