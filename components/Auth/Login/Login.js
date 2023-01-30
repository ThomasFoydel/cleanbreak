import Axios from 'axios'
import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import styles from '../Auth.module.scss'

const Login = ({ setCurrentShow, currentShow, closeAuth, login }) => {
  const [formValues, setFormValues] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let subscribed = true
    setTimeout(() => {
      if (subscribed) {
        setErrorMessage('')
      }
    }, 3400)
    return () => (subscribed = false)
  }, [errorMessage])

  const handleChange = (e) => {
    let { value } = e.target
    let id = e.target.getAttribute('name')
    setFormValues({ ...formValues, [id]: value })
  }
  const handleSubmit = async () => {
    let { email, password } = formValues
    if (email && password) {
      Axios.post('/auth/login', formValues).then((result) => {
        if (result.data.err) {
          setErrorMessage(result.data.err)
        } else {
          login({ type: 'LOGIN', payload: result.data.data })
          setTimeout(() => {
            closeAuth()
          }, 250)
        }
      })
    } else {
      setErrorMessage('all fields required')
    }
  }

  return (
    <div
      className={styles.login}
      style={{ zIndex: currentShow === 'login' ? '20' : '10' }}>
      <div className={styles.title}>sign in</div>
      <div className={styles.defaultUserLogin}>
        for testing:
        <br />
        email: test@gmail.com
        <br />
        password: password
      </div>
      <input
        className='center'
        type='email'
        onChange={handleChange}
        placeholder='email'
        name='email'
        dontbubble='true'
      />
      <input
        className='center'
        type='password'
        placeholder='password'
        onChange={handleChange}
        name='password'
        dontbubble='true'
      />
      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.loginBtn} onClick={handleSubmit}>
          sign in
        </button>
        <button
          className={styles.signupBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
      <div className={cn(styles.loginErr, 'center')}>{errorMessage}</div>
    </div>
  )
}

export default Login
