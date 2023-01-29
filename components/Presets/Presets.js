import Axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
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
  const [errorMessage, setErrorMessage] = useState('')
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
      return setErrorMessage('name value required')
    }
    const filteredState = filter(appState)
    Axios.post(
      '/presets/newsave',
      { name: presetName, state: filteredState, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          closeAll()
          setPresetName('')
          setErrorMessage(result.data.err)
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current
            }
          })
          closeAll()
          setErrorMessage('new preset saved!')
          setPresetName('')
        }
      })
      .catch((err) => console.log('save preset error: ', err))
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
        if (result.data.err) {
          closeAll()
          setErrorMessage(result.data.err)
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current
            }
          })
          closeAll()
          setErrorMessage('preset saved!')
        }
      })
      .catch((err) => console.log('save preset error: ', err))
  }

  const deletePreset = (data) => {
    Axios.post(
      '/presets/delete',
      { name: appState.currentPreset, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          closeAll()
          setErrorMessage(result.data.err)
        } else {
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
          setErrorMessage('preset deleted!')
        }
      })
      .catch((err) => {
        console.log('save preset error: ', err)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('')
    }, 1900)
  }, [errorMessage])

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

      <div className={styles.errMsg}>{errorMessage}</div>
    </div>
  )
}

export default Presets
