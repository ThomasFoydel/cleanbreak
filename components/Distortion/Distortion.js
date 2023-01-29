import React from 'react';
import DistortionSenders from 'components/DistortionSenders/DistortionSenders';
import DistortionControl from 'components/DistortionControl/DistortionControl';
import './Distortion.scss';

const Distortion = () => {
  return (
    <div className='distortion'>
      <DistortionControl />
      <DistortionSenders />
      <div className='effect-name'>distortion</div>
    </div>
  );
};

export default Distortion;
