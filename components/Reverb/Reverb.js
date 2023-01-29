import React from 'react';
import ReverbControl from 'components/ReverbControl/ReverbControl';
import ReverbSenders from 'components/ReverbSenders/ReverbSenders';
import './Reverb.scss';

const Reverb = () => {
  return (
    <div className='reverb'>
      <ReverbControl />
      <ReverbSenders />
      <div className='effect-name'>reverb</div>
    </div>
  );
};

export default Reverb;
