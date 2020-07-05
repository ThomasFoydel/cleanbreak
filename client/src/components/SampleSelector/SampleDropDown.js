import React, { useContext, useState } from 'react';
import { CTX } from 'context/Store';

const SampleDropDown = ({ name, samples }) => {
  const [appState, updateState] = useContext(CTX);
  const [opened, setOpened] = useState(false);

  let index = appState.samples.findIndex((sample) => sample.name === name);

  const handleSelect = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let newSampleName = e.target.attributes.name.value;
    let index = appState.samples.findIndex(
      (sample) => sample.name === newSampleName
    );

    updateState({
      type: 'CHANGE_SAMPLE',
      payload: {
        instrument: name,
        newSampleUrl: id,
        newSampleName,
        sampleIndex: index,
        name,
      },
    });
  };

  const handleClick = (e) => {
    if (e.target.getAttribute('type') === 'sample-name') {
      handleSelect(e);
    } else {
      // console.log(e.target.id);
      setOpened(!opened);
    }
  };

  return (
    <div
      // id='sample-selecta'
      className='sample-dropdown'
      onClick={handleClick}
      onMouseLeave={() => setOpened(false)}
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
          <div
            type='sample-name'
            // className='sample-name'
            className={`sample-name ${
              sample.name === appState.samples[index].sampleName &&
              'current-active-sample'
            }`}
            name={sample.name}
            onClick={handleClick}
            id={sample.sample}
            key={i}
          >
            {sample.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleDropDown;
