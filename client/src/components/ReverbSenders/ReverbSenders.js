import React, { useContext, useState } from 'react';
import './ReverbSenders.scss';
import { CTX } from 'context/Store';
const ReverbSenders = () => {
  const [appState, updateState] = useContext(CTX);
  const handleChange = (e) => {
    let { value, name } = e.target;
    value *= -1;

    updateState({
      type: 'CHANGE_REVERB_SENDS',
      payload: { name, value },
    });
  };

  return (
    <div className='reverb-senders'>
      {Object.keys(appState.reverbSends)
        .sort()
        .map((inst, i) => (
          <div className='inst' key={i}>
            <h2 className='reverb-name name'>{inst}</h2>
            <input
              className='range-input'
              type='range'
              min={0}
              max={50}
              name={inst}
              value={appState.reverbSends[inst] * -1}
              onChange={handleChange}
            />
          </div>
        ))}
    </div>
  );
};

export default ReverbSenders;
