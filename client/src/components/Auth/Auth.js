import React, { useState, useEffect } from 'react';
import Login from 'components/Auth/Login/Login';
import Register from 'components/Auth/Register/Register';
import { animated, useSpring, config } from 'react-spring';
import './Auth.scss';

const Auth = ({ closeAuth, login }) => {
  const [currentShow, setCurrentShow] = useState('login');
  const [loaded, setLoaded] = useState(false);

  const loginAnimation = useSpring({
    opacity: currentShow === 'login' ? 1 : 0,
  });
  const registerAnimation = useSpring({
    opacity: currentShow === 'register' ? 1 : 0,
  });
  const authAnimation = useSpring({
    opacity: loaded ? 1 : 0,
    config: config.molasses,
  });

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <animated.div style={authAnimation}>
      <div className='auth'>
        <div className='close-btn' onClick={closeAuth}></div>
        <animated.div style={loginAnimation}>
          <Login
            currentShow={currentShow}
            setCurrentShow={setCurrentShow}
            login={login}
            closeAuth={closeAuth}
          />
        </animated.div>
        <animated.div style={registerAnimation}>
          <Register setCurrentShow={setCurrentShow} currentShow={currentShow} />
        </animated.div>
      </div>
    </animated.div>
  );
};

export default Auth;
