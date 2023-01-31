import Axios from 'axios'
import toast from 'react-toastify'
import React, { useContext } from 'react'
import styles from './RevertButton.module.scss'
import { CTX } from '../../context/Store'

const RevertButton = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX)

  const revert = () => {
    if (!appState.isLoggedIn) {
      return openAuth()
    }
    const { currentPreset } = appState

    Axios.get(`/api/presets/revert/${currentPreset}`)
      .then((result) => {
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        const { presetFromDb } = result.data
        const { name, params } = presetFromDb
        updateState({
          type: 'LOAD_PRESET',
          payload: { value: params },
          current: name
        })
        toast.success(result.data.message)
      })
      .catch(() => toast.error('Revert failed'))
  }
  return (
    <button className={styles.revertBtn} onClick={revert}>
      revert
    </button>
  )
}

export default RevertButton
