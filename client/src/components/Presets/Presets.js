import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { CTX } from 'context/Store';
import './Presets.scss';
const filterOut = [
  'presets',
  'clickActive',
  'currentTransform',
  'isLoggedIn',
  'playing',
  'user',
  'currentPreset',
  'keyboardOctaveOffset',
];

const filter = (state) => {
  return Object.keys(state)
    .filter((key) => !filterOut.includes(key))
    .reduce((obj, key) => {
      obj[key] = state[key];
      return obj;
    }, {});
};

const Presets = () => {
  const [appState, updateState] = useContext(CTX);
  const [display, setDisplay] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [presetName, setPresetName] = useState('');
  const foundToken = localStorage.getItem('cleanbreak-token');

  const open = (id) => {
    setDisplay({ [id]: true });
  };
  const closeAll = () => {
    setDisplay({});
  };

  const saveNew = async () => {
    if (!presetName) {
      closeAll();
      return setErrorMessage('name value required');
    }
    const filteredState = filter(appState);
    Axios.post(
      '/presets/newsave',
      { name: presetName, state: filteredState, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          closeAll();
          setPresetName('');
          setErrorMessage(result.data.err);
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current,
            },
          });
          closeAll();
          setPresetName('');
        }
      })
      .catch((err) => console.log('save preset error: ', err));
  };
  const saveOver = async () => {
    const filteredState = filter(appState);
    Axios.post(
      '/presets/save',
      {
        name: appState.currentPreset,
        state: filteredState,
        username: appState.user.name,
      },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          closeAll();
          setErrorMessage(result.data.err);
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current,
            },
          });
        }
        closeAll();
      })
      .catch((err) => console.log('save preset error: ', err));
  };
  const deletePreset = (data) => {};

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 2800);
  }, [errorMessage]);

  const handleTextInput = (e) => {
    setPresetName(e.target.value);
  };

  return (
    <div className='presets'>
      <button onClick={() => open('saveNew')}>save as</button>
      <button onClick={() => open('saveOver')}>save</button>
      <button onClick={() => open('delete')}>delete</button>

      {display.saveNew && (
        <div className='preset-op-open save-new'>
          <input
            type='text'
            onChange={handleTextInput}
            placeholder='preset name'
          />
          <button onClick={saveNew}>save</button>
          <button onClick={closeAll}>cancel</button>
        </div>
      )}

      {display.saveOver && (
        <div className='preset-op-open save-over'>
          <button onClick={saveOver}>confirm save</button>
          <button onClick={closeAll}>cancel</button>
        </div>
      )}

      {display.delete && (
        <div className='preset-op-open delete'>
          <button onClick={deletePreset}>confirm delete</button>
          <button onClick={closeAll}>cancel</button>
        </div>
      )}
    </div>
  );
};

export default Presets;
