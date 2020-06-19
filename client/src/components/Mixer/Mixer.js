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
  const handleSolo = (e) => {
    let { name } = e.target;
    updateState({ type: 'SOLO_INST', payload: { name } });
  };
  const handleUnSolo = (e) => {
    let { name } = e.target;
    updateState({ type: 'UNSOLO_INST', payload: { name } });
  };
  const handleMute = (e) => {
    let { name } = e.target;
    console.log('name: ', name);
    updateState({ type: 'MUTE_INST', payload: { name } });
  };
  const handleUnMute = (e) => {
    let { name } = e.target;
    updateState({ type: 'UNMUTE_INST', payload: { name } });
  };
  return (
    <div className='mixer'>
      {Object.keys(appState.panVols).map((keyName, i) => (
        <div className='inst' key={i}>
          {/* {console.log(keyName)}
          {console.log(appState.solos)} */}
          <input
            onChange={handleChange}
            className='range-input'
            type='range'
            name={keyName}
            max={30}
            value={appState.panVols[keyName] * -1}
          />
          <h2 className='name'>{keyName}</h2>
          <button
            onClick={appState.solos[keyName] ? handleUnSolo : handleSolo}
            name={keyName}
            className={`solo solo-${appState.solos[keyName] && 'active'}`}
          >
            solo
          </button>
          <button
            onClick={appState.mutes[keyName] ? handleUnMute : handleMute}
            name={keyName}
            className={`mute mute-${appState.mutes[keyName] && 'active'}`}
          >
            mute
          </button>
        </div>
      ))}
    </div>
  );
};

export default Mixer;
