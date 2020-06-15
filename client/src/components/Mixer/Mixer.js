import React, { useContext } from 'react';
import './Mixer.scss';
import { CTX } from 'context/Store';

const Mixer = () => {
  const [appState, updateState] = useContext(CTX);
  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    updateState({ type: 'CHANGE_MIXER', payload: { name, value } });
  };
  console.log('panvols: ', appState.panVols);
  return (
    <div className='mixer'>
      {Object.keys(appState.panVols).map((keyName, i) => (
        <div className='inst' key={i}>
          <input
            onChange={handleChange}
            className='mixer-input'
            type='range'
            name={keyName}
            max={30}
            value={appState.panVols[keyName] * -1}
          />
          <h2 className='name'>{keyName}</h2>
        </div>
      ))}
    </div>
  );
};

export default Mixer;
