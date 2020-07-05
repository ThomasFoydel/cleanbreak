import React, { useContext, useState } from 'react';
import PresetDropDown from 'components/PresetDropDown/PresetDropDown';

import './PresetSelector.scss';
import { CTX } from 'context/Store';

const PresetSelector = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX);
  const [dropDown, setDropDown] = useState(false);

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

      updateState({
        type: 'LOAD_PRESET',
        payload: { value: newCurrent.value },
        current: newCurrent.text,
      });
    } else {
      openAuth();
    }
  };

  const toggleDropDown = () => {
    if (appState.isLoggedIn) {
      setDropDown(!dropDown);
    } else {
      openAuth();
    }
  };

  const closeDropDown = () => {
    setDropDown(false);
  };

  return (
    <div className='preset-selector'>
      <div onClick={handleSelector} id='left' className='decrement'>
        {'<'}
      </div>
      <div onMouseLeave={closeDropDown} className='dropdown-container'>
        <div
          className='current-preset'
          onClick={toggleDropDown}
          style={{
            background: dropDown ? 'rgb(100, 100, 100)' : ' #d1d1d1',
            border: dropDown ? '2px solid rgb(175, 24, 24)' : 'none',
            width: dropDown ? '23.6rem' : '24rem',
            height: dropDown ? '4.6rem' : '5rem',
          }}
        >
          {appState.currentPreset}
        </div>
        <PresetDropDown open={dropDown} />
      </div>
      <div onClick={handleSelector} id='right' className='increment'>
        {'>'}
      </div>
    </div>
  );
};

export default PresetSelector;
