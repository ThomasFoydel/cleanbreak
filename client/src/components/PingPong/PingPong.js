import React from 'react';
import PingPongControl from 'components/PingPongControl/PingPongControl';
import PingPongSenders from 'components/PingPongSenders/PingPongSenders';
import './PingPong.scss';

const PingPong = () => {
  return (
    <div className='pingpong'>
      <PingPongControl />
      <PingPongSenders />
      <h1 className='effect-name'>ping pong</h1>
    </div>
  );
};

export default PingPong;
