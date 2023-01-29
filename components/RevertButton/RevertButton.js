import React, { useContext } from 'react';
import './RevertButton.scss';
import { CTX } from 'context/Store';
import Axios from 'axios';

const RevertButton = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX);

  const revert = () => {
    if (!appState.isLoggedIn) {
      return openAuth();
    }
    const foundToken = localStorage.getItem('cleanbreak-token');
    let { currentPreset } = appState;

    Axios.get(`/presets/revert/${currentPreset}`, {
      headers: { 'x-auth-token': foundToken },
    })
      .then((result) => {
        if (result.data.err) {
          console.log('err: ', result.data.err);
        } else {
          let { presetFromDb } = result.data;
          let { name, params } = presetFromDb;
          updateState({
            type: 'LOAD_PRESET',
            payload: { value: params },
            current: name,
          });
        }
      })
      .catch((err) => {
        console.log('revert error: ', err);
      });
  };
  return (
    <button className='revert-btn' onClick={revert}>
      revert
    </button>
  );
};

export default RevertButton;
