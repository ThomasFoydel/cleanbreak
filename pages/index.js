import Axios from 'axios'
import { toast } from 'react-toastify'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { createRoot } from 'react-dom/client'
import React, { useEffect, useContext, useRef } from 'react'
import StepSequencer from '../components/StepSequencer/StepSequencer'
import Distortion from '../components/Distortion/Distortion'
import PingPong from '../components/PingPong/PingPong'
import Reverb from '../components/Reverb/Reverb'
import styles from '../styles/Main.module.scss'
import Mixer from '../components/Mixer/Mixer'
import Auth from '../components/Auth/Auth'
import { CTX } from '../context/Store'

function App() {
  const { status } = useSession()
  const loggedIn = status === 'authenticated'

  const [, updateState] = useContext(CTX)
  const modalRoot = useRef()

  useEffect(() => {
    window.addEventListener('mousedown', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: true })
    })
    window.addEventListener('mouseup', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: false })
    })
    if (!modalRoot.current) {
      modalRoot.current = createRoot(document.getElementById('modal'))
    }
  }, [])

  const fetchUserPresets = () => {
    if (status === 'authenticated') {
      Axios('/api/presets')
        .then((res) =>
          updateState({ type: 'LOAD_PRESETS', payload: res?.data?.presets })
        )
        .catch(() => toast.error('Preset fetch error'))
    } else updateState({ type: 'LOAD_PRESETS', payload: [] })
  }

  useEffect(fetchUserPresets, [status])

  const openAuth = () => {
    modalRoot.current.render(
      <div className='modal'>
        <div className='modal-container'>
          <Auth CTX={CTX} closeAuth={closeAuth} />
        </div>
      </div>
    )
  }

  const closeAuth = () => modalRoot.current.render(<></>)

  const logout = () => signOut({ redirect: false })

  return (
    <div className={styles.App}>
      {!loggedIn && (
        <button className={styles.openAuth} onClick={openAuth}>
          LOGIN / REGISTER
        </button>
      )}
      <div className={styles.background}></div>
      <div className={styles.componentsContainer}>
        <div className={styles.space}></div>
        <div className={styles.effectsContainer}>
          <Mixer />
          <Distortion />
          <PingPong />
          <Reverb />
        </div>
        <div className={styles.stepContainer}>
          <StepSequencer openAuth={openAuth} />
        </div>
      </div>
      {loggedIn && (
        <button className={styles.logOutBtn} onClick={logout}>
          logout
        </button>
      )}
    </div>
  )
}

export default App
