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
    if (e.target.className === 'sample-name') {
      console.log('NNNAME : ', e.target.attributes.name.value);
      handleSelect(e);
    } else {
      // console.log(e.target.id);
      setOpened(!opened);
    }
  };

  return (
    <div
      id='sample-selecta'
      className='sample-dropdown'
      onClick={handleClick}
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
          <div
            className='sample-name'
            name={sample.name}
            onClick={handleClick}
            id={sample.sample}
            key={i}
          >
            {/* {console.log('SAMPLE!!: ', sample.name)} */}
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
