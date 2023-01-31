import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import styles from '../Auth.module.scss'

const Login = ({ setCurrentShow, currentShow, closeAuth, login }) => {
  const [formValues, setFormValues] = useState({})

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = formValues
    if (!(email && password)) {
      return toast.error('All fields required')
    }
    try {
      const options = { redirect: false, email, password, callbackUrl: '/' }
      await signIn('credentials', options)
      toast.success('Login successful')
      closeAuth()
    } catch (err) {
      toast.error('Login failed')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
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
      />
      <input
        className='center'
        type='password'
        placeholder='password'
        onChange={handleChange}
        name='password'
      />
      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.loginBtn} type='submit'>
          sign in
        </button>
        <button
          type='button'
          className={styles.signupBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
    </form>
  )
}

export default Login
