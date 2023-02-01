import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import styles from '../Auth.module.scss'

const Login = ({ setCurrentShow, currentShow, closeAuth }) => {
  const [formValues, setFormValues] = useState({})

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = formValues
    if (!(email && password)) return toast.error('All fields required')

    try {
      const options = { redirect: false, email, password, callbackUrl: '/' }
      const res = await signIn('credentials', options)
      if (res.error) return toast.error(res.error)
      toast.success('Login successful')
      closeAuth()
    } catch (err) {
      toast.error('Login failed')
    }
  }

  const fields = ['email', 'password']

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.login}
      style={{ zIndex: currentShow === 'login' ? '20' : '10' }}>
      <div className={styles.title}>LOG IN</div>
      <div className={styles.defaultUserLogin}>
        <p>for testing:</p>
        <p>email: test@gmail.com</p>
        <p>password: password</p>
      </div>
      {fields.map((field) => (
        <input
          key={field}
          className='center'
          type={field}
          onChange={handleChange}
          placeholder={field}
          name={field}
        />
      ))}

      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.logInBtn} type='submit'>
          log in
        </button>
        <button
          type='button'
          className={styles.signUpBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
    </form>
  )
}

export default Login
