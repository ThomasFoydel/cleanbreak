import React, { useContext, useState } from 'react';
import { CTX } from 'context/Store';

const SampleDropDown = ({ name, samples }) => {
  const [appState, updateState] = useContext(CTX);
  const [opened, setOpened] = useState(false);

  let index = appState.samples.findIndex((sample) => sample.name === name);

  return (
    <div
      id='sample-selecta'
      className='sample-dropdown'
      onClick={() => setOpened(!opened)}
      onScroll={(e) => e.preventDefault()}
      onMouseLeave={() => setOpened(false)}
      //   style={{ height: hover ? '12rem' : '4rem' }}
    >
      <div className='currentsample-name'>
        {appState.samples[index].sampleName}
      </div>
      <div
        className='hover-open'
        style={{
          zIndex: opened ? '3' : '-1',
          opacity: opened ? '1' : '0',
          transform: opened
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-4rem)',
        }}
      >
        {samples.map((sample, i) => (
          <div className='sample-name' key={i}>
            {sample.name}
          </div>
        ))}
      </div>
      {/* {opened && (
        <div className='hover-open'>
          {samples.map((sample) => (
            <div className='sample-name'>{sample.name}</div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SampleDropDown;
