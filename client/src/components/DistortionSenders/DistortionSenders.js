import React, { useContext, useState } from 'react';
import './DistortionSenders.scss';
import { CTX } from 'context/Store';
const DistortionSenders = () => {
  const [appState, updateState] = useContext(CTX);
  const handleChange = (e) => {
    let { value, name } = e.target;
    value *= -1;

    updateState({
      type: 'CHANGE_DISTORTION_SENDS',
      payload: { name, value },
    });
  };

  return (
    <div className='distortion-senders'>
      <h1 className='effect-name'>distortion</h1>
      {Object.keys(appState.distortionSends)
        .sort()
        .map((inst, i) => (
          <div className='inst' key={i}>
            <h2 className='name'>{inst}</h2>
            <input
              className='range-input'
              type='range'
              min={0}
              max={50}
              name={inst}
              value={appState.distortionSends[inst] * -1}
              onChange={handleChange}
            />
          </div>
        ))}
    </div>
  );
};

export default DistortionSenders;
