import React, { useContext } from 'react';
import { CTX } from 'context/Store';
const Tempo = () => {
  const [appState, updateState] = useContext(CTX);

  const handleChange = (e) => {
    updateState({ type: 'CHANGE_TEMPO', payload: e.target.value });
  };
  return (
    <div>
      <div className='name'>tempo</div>
      <input
        type='range'
        min='65'
        max='200'
        value={appState.bpm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Tempo;
