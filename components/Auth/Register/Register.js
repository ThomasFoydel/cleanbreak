import Axios from 'axios'
import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import styles from '../Auth.module.scss'

const Register = ({ setCurrentShow, currentShow }) => {
  const [formValues, setFormValues] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('')
    }, 3400)
  }, [errorMessage])

  const handleChange = (e) => {
    let { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }

  const handleSubmit = () => {
    let { email, name, password, confirmpassword } = formValues
    if (email && name && password && confirmpassword) {
      Axios.post('/auth/register', formValues)
        .then((result) => {
          if (result.data.err) {
            setErrorMessage(result.data.err)
          } else {
            setCurrentShow('login')
          }
        })
        .catch((err) => console.log('registration error: ', err))
    } else {
      setErrorMessage('all inputs required!')
    }
  }

  return (
    <div
      className={styles.register}
      style={{ zIndex: currentShow === 'register' ? '20' : '10' }}>
      <div className={styles.title}>register</div>
      <input
        className='center'
        type='text'
        onChange={handleChange}
        placeholder='name'
        id='name'
        dontbubble='true'
      />
      <input
        className='center'
        type='email'
        onChange={handleChange}
        placeholder='email'
        id='email'
        dontbubble='true'
      />
      <input
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='password'
        id='password'
        dontbubble='true'
      />
      <input
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='confirm password'
        id='confirmpassword'
        dontbubble='true'
      />
      <button
        className={cn(styles.registerBtn, 'center')}
        onClick={handleSubmit}>
        submit
      </button>
      <button
        className={cn(styles.signInBtn, 'center')}
        onClick={() => setCurrentShow('login')}>
        i already have an account
      </button>
      <div className={styles.errMsg}>{errorMessage}</div>
    </div>
  )
}

export default Register
