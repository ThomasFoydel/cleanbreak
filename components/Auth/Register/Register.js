import Axios from 'axios'
import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import styles from '../Auth.module.scss'

const inputs = [
  { name: 'name', id: 'name' },
  { name: 'email', id: 'email' },
  { name: 'password', id: 'password' },
  { name: 'confirmPassword', id: 'confirmPassword' }
]

const Register = ({ setCurrentShow, currentShow }) => {
  const [formValues, setFormValues] = useState({})

  const handleChange = (e) => {
    const { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, name, password, confirmPassword } = formValues
    if (!(email && name && password && confirmPassword)) {
      return toast.error('All inputs required')
    }
    Axios.post('/api/auth/register', formValues)
      .then((result) => {
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        toast.success(result.data.message)
        setCurrentShow('login')
      })
      .catch(() => toast.error('Registration failed'))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.register}
      style={{ zIndex: currentShow === 'register' ? '20' : '10' }}>
      <div className={styles.title}>register</div>
      {inputs.map(({ name, id }) => (
        <input
          className='center'
          key={id}
          type={id.toLowerCase().includes('password') ? 'password' : 'text'}
          onChange={handleChange}
          placeholder={name}
          id={id}
        />
      ))}
      <button type='submit' className={cn(styles.registerBtn, 'center')}>
        submit
      </button>
      <button
        type='button'
        className={cn(styles.signInBtn, 'center')}
        onClick={() => setCurrentShow('login')}>
        i already have an account
      </button>
    </form>
  )
}

export default Register
