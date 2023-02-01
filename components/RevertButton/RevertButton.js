import Axios from 'axios'
import { toast } from 'react-toastify'
import React, { useContext } from 'react'
import { useSession } from 'next-auth/react'
import styles from './RevertButton.module.scss'
import { CTX } from '../../context/Store'

const RevertButton = ({ openAuth }) => {
  const [{ currentPreset }, updateState] = useContext(CTX)
  const { status } = useSession()
  const loggedIn = status === 'authenticated'

  const revert = () => {
    if (!loggedIn) return openAuth()

    Axios.get(`/api/presets/${currentPreset._id}`)
      .then((result) => {
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        updateState({ type: 'LOAD_PRESET', payload: result.data.preset })
        toast.success('Preset reverted')
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
