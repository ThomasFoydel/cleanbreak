import React, { useContext } from 'react';
import { CTX } from 'context/Store';
import './DistortionControl.scss';
const DistortionControl = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    let { value, id } = e.target;
    value /= 100;
    updateState({ type: 'CHANGE_DISTORTION', payload: { type: id, value } });
  };

  const handleDrive = (e) => {
    let { value, id } = e.target;
    value /= 100;
    updateState({ type: 'CHANGE_DISTORTION', payload: { type: id, value } });
  };
  return (
    <div className='distortion-control'>
      <div className='inst'>
        <h2 className='name'>mix</h2>
        <input
          type='range'
          className='range-input'
          id='wet'
          step={10}
          value={appState.distortion.wet * 100}
          onChange={handleMix}
        />
      </div>
      <div className='inst'>
        <h2 className='name'>drive</h2>
        <input
          type='range'
          className='range-input'
          id='distortion'
          step={10}
          value={appState.distortion.distortion * 100}
          onChange={handleDrive}
        />
      </div>
    </div>
  );
};

export default DistortionControl;
