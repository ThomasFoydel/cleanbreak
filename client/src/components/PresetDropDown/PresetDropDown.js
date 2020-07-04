import React, { useContext } from 'react';
import { CTX } from 'context/Store';
import './PresetDropDown.scss';

const PresetDropDown = ({ open }) => {
  const [appState, updateState] = useContext(CTX);

  return (
    <div
      className='preset-dropdown'
      style={{
        zIndex: open ? '3' : '-1',
        opacity: open ? '1' : '0',
        transform: open
          ? 'translateX(-50%) translateY(-.2rem)'
          : 'translateX(-50%) translateY(-9rem)',
      }}
    >
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
      <div className='preset-name'>one</div>
    </div>
  );
};

export default PresetDropDown;
