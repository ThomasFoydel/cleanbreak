import Axios from 'axios'
import React, { useContext } from 'react'
import styles from './RevertButton.module.scss'
import { CTX } from '../../context/Store'

const RevertButton = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX)

  const revert = () => {
    if (!appState.isLoggedIn) {
      return openAuth()
    }
    const foundToken = localStorage.getItem('cleanbreak-token')
    const { currentPreset } = appState

    Axios.get(`/presets/revert/${currentPreset}`, {
      headers: { 'x-auth-token': foundToken }
    })
      .then((result) => {
        if (result.data.err) {
          console.error('err: ', result.data.err)
        } else {
          const { presetFromDb } = result.data
          const { name, params } = presetFromDb
          updateState({
            type: 'LOAD_PRESET',
            payload: { value: params },
            current: name
          })
        }
      })
      .catch((err) => {
        console.log('revert error: ', err)
      })
  }
  return (
    <button className={styles.revertBtn} onClick={revert}>
      revert
    </button>
  )
}

export default RevertButton
