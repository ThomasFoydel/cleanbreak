import React, { useContext } from 'react';
import './PresetSelector.scss';
import { CTX } from 'context/Store';

const PresetSelector = () => {
  const [appState, updateState] = useContext(CTX);
  let { presets, currentPreset } = appState;

  function findWithAttr(array, attr, val) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === val) {
        return i;
      }
    }
    return -1;
  }
  const currentIndex = findWithAttr(presets, 'text', currentPreset);
  const handleSelector = (e) => {
    const { id } = e.target;
    if (presets.length > 0) {
      let newCurrent;
      if (id === 'left') {
        if (currentIndex > 0) {
          newCurrent = presets[currentIndex - 1];
        } else {
          // user has hit zero, go to end of list
          newCurrent = presets[presets.length - 1];
        }
      } else if (id === 'right') {
        if (currentIndex < presets.length - 1) {
          newCurrent = presets[currentIndex + 1];
        } else {
          // user has hit end of list, go back to zero
          newCurrent = presets[0];
        }
      }
      //   closeSaveDelete();

      updateState({
        type: 'LOAD_PRESET',
        payload: { value: newCurrent.value },
        current: newCurrent.text,
      });
    }
  };

  return (
    <div className='preset-selector'>
      <div onClick={handleSelector} id='left' className='decrement'>
        {'<'}
      </div>
      <div className='current-preset'>{appState.currentPreset}</div>
      <div onClick={handleSelector} id='right' className='increment'>
        {'>'}
      </div>
    </div>
  );
};

export default PresetSelector;
