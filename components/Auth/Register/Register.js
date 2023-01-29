import React, { useState, useEffect } from 'react';
import Axios from 'axios';
const Register = ({ setCurrentShow, currentShow }) => {
  const [formValues, setFormValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3400);
  }, [errorMessage]);

  const handleChange = (e) => {
    let { value, id } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = () => {
    let { email, name, password, confirmpassword } = formValues;
    if (email && name && password && confirmpassword) {
      Axios.post('/auth/register', formValues)
        .then((result) => {
          if (result.data.err) {
            setErrorMessage(result.data.err);
          } else {
            setCurrentShow('login');
          }
        })
        .catch((err) => console.log('registration error: ', err));
    } else {
      setErrorMessage('all inputs required!');
    }
  };

  const handleKeyDown = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div
      className='register'
      style={{ zIndex: currentShow === 'register' ? '20' : '10' }}
    >
      <div className='title'>register</div>
      <input
        onKeyPress={handleKeyDown}
        className='center'
        type='text'
        onChange={handleChange}
        placeholder='name'
        id='name'
        dontbubble='true'
      />
      <input
        onKeyPress={handleKeyDown}
        className='center'
        type='email'
        onChange={handleChange}
        placeholder='email'
        id='email'
        dontbubble='true'
      />
      <input
        onKeyPress={handleKeyDown}
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='password'
        id='password'
        dontbubble='true'
      />
      <input
        onKeyPress={handleKeyDown}
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='confirm password'
        id='confirmpassword'
        dontbubble='true'
      />
      <button className='center register-btn' onClick={handleSubmit}>
        submit
      </button>
      <button
        className='center signin-btn'
        onClick={() => setCurrentShow('login')}
      >
        i already have an account
      </button>
      <div className='err-msg'>{errorMessage}</div>
    </div>
  );
};

export default Register;
