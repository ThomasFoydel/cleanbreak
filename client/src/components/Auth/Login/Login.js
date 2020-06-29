import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

const Login = ({ setCurrentShow, closeAuth, login }) => {
  const [formValues, setFormValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let subscribed = true;
    setTimeout(() => {
      if (subscribed) {
        setErrorMessage('');
      }
    }, 3400);
    return () => (subscribed = false);
  }, [errorMessage]);

  const handleKeyDown = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    let { value, id } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };
  const handleSubmit = async () => {
    let { email, password } = formValues;
    if (email && password) {
      Axios.post('/auth/login', formValues).then((result) => {
        if (result.data.err) {
          setErrorMessage(result.data.err);
        } else {
          login({ type: 'LOGIN', payload: result.data.data });
          setTimeout(() => {
            closeAuth();
          }, 250);
        }
      });
    } else {
      setErrorMessage('all fields required');
    }
  };

  return (
    <div className='login'>
      <div className='title'>sign in</div>
      <div className='default-user-login'>
        for testing:
        <br />
        email: test@gmail.com
        <br />
        password: password
      </div>
      <input
        className='center'
        type='email'
        onKeyPress={handleKeyDown}
        onChange={handleChange}
        placeholder='email'
        id='email'
        dontbubble='true'
      />
      <input
        className='center'
        type='password'
        onKeyPress={handleKeyDown}
        placeholder='password'
        onChange={handleChange}
        id='password'
        dontbubble='true'
      />
      <div className='btns-container center'>
        <button className='signin-btn' onClick={handleSubmit}>
          sign in
        </button>
        <button
          className='signup-btn'
          onClick={() => setCurrentShow('register')}
        >
          sign up
        </button>
      </div>
      <div className='login-err center'>{errorMessage}</div>
    </div>
  );
};

export default Login;
