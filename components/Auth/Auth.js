import React, { useState, useEffect } from 'react'
import { animated, useSpring, config } from 'react-spring'
import Register from './Register/Register'
import styles from './Auth.module.scss'
import Login from './Login/Login'

const Auth = ({ closeAuth }) => {
  const [currentShow, setCurrentShow] = useState('login')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [setLoaded])

  const loginAnimation = useSpring({ opacity: currentShow === 'login' ? 1 : 0 })

  const registerAnimation = useSpring({
    opacity: currentShow === 'register' ? 1 : 0
  })

  const authAnimation = useSpring({
    opacity: loaded ? 1 : 0,
    config: config.molasses
  })

  return (
    <animated.div style={authAnimation}>
      <div className={styles.auth}>
        <button className={styles.closeBtn} onClick={closeAuth}>
          <div className={styles.closeBtnX} />
        </button>

        <animated.div style={loginAnimation}>
          <Login
            currentShow={currentShow}
            setCurrentShow={setCurrentShow}
            closeAuth={closeAuth}
          />
        </animated.div>
        <animated.div style={registerAnimation}>
          <Register setCurrentShow={setCurrentShow} currentShow={currentShow} />
        </animated.div>
      </div>
    </animated.div>
  )
}

export default Auth
