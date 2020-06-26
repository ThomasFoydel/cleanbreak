import React, { useContext } from 'react';
import './PingPongControl.scss';
import { CTX } from 'context/Store';

const PingPongControl = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    let { value, id } = e.target;
    value /= 100;
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } });
  };

  const handleDelayTime = (e) => {
    let { value, id } = e.target;
    value /= 50;
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } });
  };

  const handleFeedback = (e) => {
    let { value, id } = e.target;
    value /= 100;
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } });
  };

  return (
    <div className='pingpong-control'>
      <div className='effect-name'>ping pong</div>
      <div className='inst'>
        <h2 className='name'>mix</h2>
        <input
          type='range'
          className='range-input'
          id='wet'
          step={10}
          value={appState.pingPong.wet * 100}
          onChange={handleMix}
        />
      </div>
      <div className='inst'>
        <h2 className='name'>time</h2>
        <input
          type='range'
          className='range-input'
          id='delayTime'
          step={10}
          value={appState.pingPong.delayTime * 50}
          onChange={handleDelayTime}
        />
      </div>
      <div className='inst'>
        <h2 className='name'>feedback</h2>
        <input
          type='range'
          className='range-input'
          id='feedback'
          step={10}
          value={appState.pingPong.feedback * 100}
          onChange={handleFeedback}
        />
      </div>
    </div>
  );
};

export default PingPongControl;
