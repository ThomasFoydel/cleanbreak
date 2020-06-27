import React, { useContext, useState } from 'react';
import './PingPongSenders.scss';
import { CTX } from 'context/Store';
const PingPongSenders = () => {
  const [appState, updateState] = useContext(CTX);
  const handleChange = (e) => {
    let { value, name } = e.target;
    value *= -1;

    updateState({
      type: 'CHANGE_PINGPONG_SENDS',
      payload: { name, value },
    });
  };

  return (
    <div className='pingpong-senders'>
      {Object.keys(appState.pingPongSends)
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
              value={appState.pingPongSends[inst] * -1}
              onChange={handleChange}
            />
          </div>
        ))}
    </div>
  );
};

export default PingPongSenders;
