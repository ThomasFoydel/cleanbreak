import React, { useContext } from 'react';
import './SampleSelector.scss';
import samples from 'samples/drums/index';
import SampleDropDown from 'components/SampleSelector/SampleDropDown';
import { CTX } from 'context/Store';

const SampleSelector = () => {
  const [appState, updateState] = useContext(CTX);

  const handleIncDec = (e) => {
    let direction = e.target.attributes[1].value;
    const { id, name } = e.target;
    const instrumentIndex = appState.samples.findIndex(
      (sample) => sample.name === name
    );
    const currentSampleName = appState.samples[instrumentIndex].sampleName;
    let sampleIndex = samples.findIndex(
      (sample) => sample.name === currentSampleName
    );
    if (direction === 'increment') {
      if (sampleIndex < samples.length - 1) {
        sampleIndex++;
      } else {
        sampleIndex = 0;
      }
    } else if (direction === 'decrement') {
      if (sampleIndex > 0) {
        sampleIndex--;
      } else {
        sampleIndex = samples.length - 1;
      }
    }
    let newSampleUrl = samples[sampleIndex].sample;
    let newSampleName = samples[sampleIndex].name;
    updateState({
      type: 'CHANGE_SAMPLE',
      payload: {
        instrument: id,
        newSampleUrl,
        newSampleName,
        sampleIndex,
        name: name,
      },
    });
  };

  const handleIncrement = (e) => {
    const { id, name } = e.target;
    const instrumentIndex = appState.samples.findIndex(
      (sample) => sample.name === name
    );
    const currentSampleName = appState.samples[instrumentIndex].sampleName;
    let sampleIndex = samples.findIndex(
      (sample) => sample.name === currentSampleName
    );
    if (sampleIndex < samples.length - 1) {
      sampleIndex++;
    } else {
      sampleIndex = 0;
    }
    let newSampleUrl = samples[sampleIndex].sample;
    let newSampleName = samples[sampleIndex].name;
    updateState({
      type: 'CHANGE_SAMPLE',
      payload: {
        instrument: id,
        newSampleUrl,
        newSampleName,
        sampleIndex,
        name: name,
      },
    });
  };

  const handleDecrement = (e) => {
    const { id, name } = e.target;
    const instrumentIndex = appState.samples.findIndex(
      (sample) => sample.name === name
    );
    const currentSampleName = appState.samples[instrumentIndex].sampleName;
    let sampleIndex = samples.findIndex(
      (sample) => sample.name === currentSampleName
    );
    if (sampleIndex > 0) {
      sampleIndex--;
    } else {
      sampleIndex = samples.length - 1;
    }
    let newSampleUrl = samples[sampleIndex].sample;
    let newSampleName = samples[sampleIndex].name;
    updateState({
      type: 'CHANGE_SAMPLE',
      payload: {
        instrument: id,
        newSampleUrl,
        newSampleName,
        sampleIndex,
        name: name,
      },
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
    <div className='sample-selector-container'>
      {appState.samples.map((instrument, i) => (
        <div className='sample-selector' key={i}>
          <button
            id={instrument.type}
            name={instrument.name}
            direction='decrement'
            onClick={handleIncDec}
            className='selector-btn'
          >
            {'<'}
          </button>
          <SampleDropDown name={instrument.name} samples={samples} />
          <button
            id={instrument.type}
            name={instrument.name}
            direction='increment'
            onClick={handleIncDec}
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
