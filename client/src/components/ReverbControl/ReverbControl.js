import React, { useContext } from 'react';
import { CTX } from 'context/Store';
import './ReverbControl.scss';
const ReverbControl = () => {
  const [appState, updateState] = useContext(CTX);

  const handleDecay = (e) => {
    let { value, id } = e.target;
    value = +value;
    value /= 20;

    updateState({ type: 'CHANGE_REVERB', payload: { type: id, value } });
  };

  const handlePreDelay = (e) => {
    let { value, id } = e.target;
    value = +value;
    value /= 100;

    updateState({ type: 'CHANGE_REVERB', payload: { type: id, value } });
  };
  return (
    <div className='reverb-control'>
      <div className='effect-name'>REVERB</div>
      <div className='inst'>
        <input
          type='range'
          className='range-input'
          id='decay'
          step={10}
          value={appState.reverb.decay * 20}
          // value={appState.reverb.decay}
          onChange={handleDecay}
        />
      </div>
      <div className='inst'>
        <input
          type='range'
          className='range-input'
          id='preDelay'
          step={5}
          value={appState.reverb.preDelay * 100}
          // value={appState.reverb.preDelay}
          onChange={handlePreDelay}
        />
      </div>
    </div>
  );
};

export default ReverbControl;
