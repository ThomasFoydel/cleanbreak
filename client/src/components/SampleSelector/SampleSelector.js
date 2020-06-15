import React, { useContext } from 'react';
import './SampleSelector.scss';
import samples from 'samples/drums/index';

import { CTX } from 'context/Store';

const SampleSelector = () => {
  const [appState, updateState] = useContext(CTX);

  const handleIncrement = (e) => {
    let { id, name } = e.target;
    let instrumentSamples = samples[id];

    let currentSample = appState.samples.filter((inst) => inst.name === name)[0]
      .sample;
    let currentIndex = instrumentSamples.indexOf(currentSample);

    let newIndex;
    if (currentIndex < instrumentSamples.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = 0;
    }
    let newSampleUrl = instrumentSamples[newIndex];

    updateState({
      type: 'CHANGE_SAMPLE',
      payload: { instrument: id, newSampleUrl, name: name },
    });
  };

  const handleDecrement = (e) => {
    let { id, name } = e.target;
    let instrumentSamples = samples[id];

    let currentSample = appState.samples.filter((inst) => inst.name === name)[0]
      .sample;
    let currentIndex = instrumentSamples.indexOf(currentSample);

    let newIndex;
    if (currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = instrumentSamples.length - 1;
    }
    let newSampleUrl = instrumentSamples[newIndex];

    updateState({
      type: 'CHANGE_SAMPLE',
      payload: { instrument: id, newSampleUrl, name: name },
    });
  };

  const handleClear = (e) => {
    let { name } = e.target;
    updateState({
      type: 'CLEAR_GRID_INST',
      payload: { name: name },
    });
  };

  return (
    <div>
      {appState.samples.map((instrument, i) => (
        <div className='sample-selector' key={i}>
          <button
            id={instrument.type}
            name={instrument.name}
            onClick={handleDecrement}
            className='selector-btn'
          >
            {'<'}
          </button>

          <button
            id={instrument.type}
            name={instrument.name}
            onClick={handleIncrement}
            className='selector-btn'
          >
            {'>'}
          </button>
          <button
            name={instrument.name}
            onClick={handleClear}
            className='clear-btn'
          >
            clear
          </button>
        </div>
      ))}
    </div>
  );
};

export default SampleSelector;
