import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';
import Auth from 'components/Auth/Auth';
import Axios from 'axios';

import Mixer from 'components/Mixer/Mixer';
import Distortion from 'components/Distortion/Distortion';
import PingPong from 'components/PingPong/PingPong';
import Reverb from 'components/Reverb/Reverb';

function App() {
  const [appState, updateState] = useContext(CTX);
  const [displayAuth, setDisplayAuth] = useState(false);

  useEffect(() => {
    window.addEventListener('mousedown', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: true });
    });
    window.addEventListener('mouseup', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: false });
    });
  }, []);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      const foundToken = localStorage.getItem('cleanbreak-token');
      if (!foundToken) {
        updateState({
          type: 'LOGOUT',
        });
      } else {
        const setAuthInfo = async () => {
          Axios.get('/auth/user', {
            headers: { 'x-auth-token': foundToken },
          })
            .then((result) => {
              if (result.data.err) {
                console.log('err: ', result.data.err);
              } else {
                updateState({
                  type: 'LOGIN',
                  payload: { user: result.data, token: foundToken },
                });
              }
            })
            .catch((err) => {
              updateState({
                type: 'LOGOUT',
              });
            });
        };
        setAuthInfo();
      }
    }
    return () => {
      subscribed = false;
    };
  }, [updateState]);

  const closeAuth = () => {
    ReactDOM.render(<div />, document.getElementById('modal'));
    setDisplayAuth(false);
  };

  const logout = () => {
    updateState({ type: 'LOGOUT' });
  };
  const login = (e) => {
    updateState(e);
  };

  const openAuth = () => {
    ReactDOM.render(
      <div className='modal'>
        <div className='modal-container'>
          <Auth CTX={CTX} closeAuth={closeAuth} login={login} />
        </div>
      </div>,

      document.getElementById('modal')
    );
    setDisplayAuth(true);
  };
  return (
    <div className='App '>
      {appState.isLoggedIn ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={openAuth}>open auth</button>
      )}
      <div className='background'></div>
      <div className='components-container'>
        <StepSequencer />
        <Mixer />
        <Distortion />
        <PingPong />
        <Reverb />
      </div>
    </div>
  );
}

export default App;
