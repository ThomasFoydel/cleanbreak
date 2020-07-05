import React, { useContext } from 'react';
import { CTX } from 'context/Store';
import './PresetDropDown.scss';

const PresetDropDown = ({ open }) => {
  const [appState, updateState] = useContext(CTX);

  const handleSelect = (e) => {
    let { id } = e.target;
    let name = e.target.getAttribute('name');

    let value = JSON.parse(id);
    updateState({
      type: 'LOAD_PRESET',
      payload: { value },
      current: name,
    });
  };

  return (
    <div
      className='preset-dropdown'
      style={{
        zIndex: open ? '3' : '-1',
        opacity: open ? '1' : '0',
        transform: open
          ? 'translateX(-50%) translateY(-.2rem)'
          : 'translateX(-50%) translateY(-5rem)',
      }}
    >
      <div className='presets-list'>
        {appState.presets.map((preset) => (
          <div
            className={`preset-name ${
              preset.text === appState.currentPreset && 'current-active-preset'
            }`}
            key={preset.text}
            id={JSON.stringify(preset.value)}
            name={preset.text}
            onClick={handleSelect}
          >
            {preset.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresetDropDown;
