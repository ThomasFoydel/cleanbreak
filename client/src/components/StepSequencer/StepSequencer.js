import React, { useContext } from 'react';
import Square from 'components/Square/Square';
import { CTX } from 'context/Store';

import './StepSequencer.scss';

const StepSequencer = () => {
  const [appState, updateState] = useContext(CTX);

  const handleStepClick = (e) => {
    updateState({ type: 'CHANGE_SEQUENCE', payload: e });
  };
  const handleStart = () => {
    updateState({ type: 'START' });
  };

  const handleStop = () => {
    updateState({ type: 'STOP' });
  };
  const handleMouseEnter = (e) => {
    if (appState.clickActive) {
      updateState({ type: 'CHANGE_SEQUENCE', payload: e });
    }
  };
  return (
    <div className='sequencer'>
      {Object.keys(appState.sequencerGrid).map((inst, i) => (
        <div key={i} className='instrument-container'>
          <h2 className='instrument-name'>{inst}</h2>
          {appState.sequencerGrid[inst].map((step, i) => (
            <Square
              key={i}
              step={i}
              instrument={inst}
              value={step}
              handleClick={handleStepClick}
              handleMouseEnter={handleMouseEnter}
            />
          ))}
        </div>
      ))}
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
};

export default StepSequencer;
