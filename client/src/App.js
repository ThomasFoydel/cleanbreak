import React, { useEffect, useContext } from 'react';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';

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
    <div className='App'>
      <h1>hello world</h1>
      <StepSequencer />
    </div>
  );
}

export default App;
