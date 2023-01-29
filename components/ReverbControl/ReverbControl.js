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

  const handleMix = (e) => {
    let { value, id } = e.target;
    value = +value;
    value /= 100;

    updateState({ type: 'CHANGE_REVERB', payload: { type: id, value } });
  };
  return (
    <div className='reverb-control'>
      <div className='inst'>
        <h2 className='name'>decay</h2>
        <input
          type='range'
          className='range-input'
          id='decay'
          step={10}
          value={appState.reverb.decay * 20}
          onChange={handleDecay}
        />
      </div>
      <div className='inst'>
        <h2 className='name'>pre-delay</h2>
        <input
          type='range'
          className='range-input'
          id='preDelay'
          step={5}
          value={appState.reverb.preDelay * 100}
          onChange={handlePreDelay}
        />
      </div>
      <div className='inst'>
        <h2 className='name'>mix</h2>
        <input
          type='range'
          className='range-input'
          id='wet'
          step={5}
          value={appState.reverb.wet * 100}
          onChange={handleMix}
        />
      </div>
    </div>
  );
};

export default ReverbControl;
