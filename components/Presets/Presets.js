import Axios from 'axios'
import toast from 'react-toastify'
import React, { useContext, useState } from 'react'
import styles from './Presets.module.scss'
import { CTX } from '../../context/Store'
import cn from 'classnames'
const filterOut = [
  'presets',
  'clickActive',
  'currentTransform',
  'isLoggedIn',
  'playing',
  'user',
  'currentPreset',
  'keyboardOctaveOffset'
]

const filter = (state) => {
  return Object.keys(state)
    .filter((key) => !filterOut.includes(key))
    .reduce((obj, key) => {
      obj[key] = state[key]
      return obj
    }, {})
}

const Presets = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX)
  const [display, setDisplay] = useState({})
  const [presetName, setPresetName] = useState('')
  const foundToken = localStorage.getItem('cleanbreak-token')
  let { isLoggedIn } = appState

  const open = (id) => {
    setDisplay({ [id]: true })
  }
  const closeAll = () => {
    setDisplay({})
  }

  const saveNew = async () => {
    if (!presetName) {
      closeAll()
      return toast.error('Name value required')
    }
    const filteredState = filter(appState)
    Axios.post(
      '/presets/newsave',
      { name: presetName, state: filteredState, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.status === 'error') {
          closeAll()
          setPresetName('')
          return toast.error(result.data.message)
        }
        updateState({
          type: 'UPDATE_PRESETS',
          payload: {
            presets: result.data.presets,
            current: result.data.current
          }
        })
        closeAll()
        toast.success(result.data.message)
        setPresetName('')
      })
      .catch(() => toast.error('Preset save failed'))
  }

  const saveOver = async () => {
    const filteredState = filter(appState)
    Axios.post(
      '/presets/save',
      {
        name: appState.currentPreset,
        state: filteredState,
        username: appState.user.name
      },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.status === 'error') {
          closeAll()
          return toast.error(result.data.message)
        }

        updateState({
          type: 'UPDATE_PRESETS',
          payload: {
            presets: result.data.presets,
            current: result.data.current
          }
        })
        closeAll()
        toast.success(result.data.message)
      })
      .catch(() => toast.error('Preset save failed'))
  }

  const deletePreset = () => {
    Axios.post(
      '/presets/delete',
      { name: appState.currentPreset, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.status === 'error') {
          closeAll()
          return toast.error(result.data.message)
        }
        updateState({
          type: 'UPDATE_PRESETS',
          payload: {
            presets: result.data.presets,
            current: result.data.current
          }
        })
        updateState({
          type: 'LOAD_PRESET',
          text: result.data.current,
          payload: result.data.presets[result.data.newCurrentIndex]
        })
        closeAll()
        toast.success(result.data.message)
      })
      .catch(() => toast.error('Preset delete failed'))
  }

  const handleTextInput = (e) => {
    setPresetName(e.target.value)
  }

  return (
    <div className={styles.presets}>
      <button onClick={() => (isLoggedIn ? open('saveNew') : openAuth())}>
        save as
      </button>
      <button onClick={() => (isLoggedIn ? open('saveOver') : openAuth())}>
        save
      </button>
      <button onClick={() => (isLoggedIn ? open('delete') : openAuth())}>
        delete
      </button>

      {display.saveNew && (
        <div className={cn(styles.presetOpOpen, styles.saveNew)}>
          <input
            type='text'
            onChange={handleTextInput}
            placeholder='preset name'
          />
          <button className={styles.confirm} onClick={saveNew}>
            save
          </button>
          <button className={styles.cancel} onClick={closeAll}>
            cancel
          </button>
        </div>
      )}

      {display.saveOver && (
        <div className={cn(styles.presetOpOpen, styles.saveOver)}>
          <button className={styles.confirm} onClick={saveOver}>
            confirm save
          </button>
          <button className={styles.cancel} onClick={closeAll}>
            cancel
          </button>
        </div>
      )}

      {display.delete && (
        <div className={cn(styles.presetOpOpen, styles.delete)}>
          <button className={styles.confirm} onClick={deletePreset}>
            confirm delete
          </button>
          <button className={styles.cancel} onClick={closeAll}>
            cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default Presets
