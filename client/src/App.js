import React, { useEffect, useContext } from 'react';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';
import Tempo from 'components/Tempo/Tempo';
import Swing from 'components/Swing/Swing';

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
    <div className='App'>
      <h1>hello world</h1>
      <StepSequencer />
      <Tempo />
      <Swing />
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
}

export default App;
