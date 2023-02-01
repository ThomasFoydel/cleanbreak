import Axios from 'axios'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import styles from './Presets.module.scss'
import { CTX } from '../../context/Store'

const filterOut = ['user', 'presets', 'playing', 'clickActive', 'currentPreset']

const sampleFilter = (s) => s.map(({ name, inst }) => ({ name, inst }))

const filter = (state) => {
  return Object.keys(state)
    .filter((key) => !filterOut.includes(key))
    .reduce((obj, key) => {
      if (key === 'samples') obj[key] = sampleFilter(state.samples)
      else obj[key] = state[key]
      return obj
    }, {})
}

const Presets = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX)
  const { currentPreset } = appState
  const [display, setDisplay] = useState(null)
  const [presetName, setPresetName] = useState('')
  const { status } = useSession()
  const loggedIn = status === 'authenticated'

  const open = (e) => (loggedIn ? setDisplay(e.target.id) : openAuth())

  const closeAll = () => setDisplay(null)

  const saveNew = async (e) => {
    e.preventDefault()
    if (!presetName) {
      closeAll()
      return toast.error('Name value required')
    }

    const filteredState = filter(appState)

    Axios.post('api/presets', { name: presetName, state: filteredState })
      .then((result) => {
        closeAll()
        setPresetName('')
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        updateState({ type: 'ADD_PRESET', payload: result.data.preset })
        toast.success(result.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }

  const saveOver = async (e) => {
    e.preventDefault()
    const filteredState = filter(appState)
    Axios.put(`/api/presets/${currentPreset._id}`, { state: filteredState })
      .then((result) => {
        closeAll()
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        updateState({ type: 'UPDATE_PRESET', payload: result?.data?.preset })
        toast.success(result.data.message)
      })
      .catch(() => toast.error('Preset save failed'))
  }

  const deletePreset = (e) => {
    e.preventDefault()
    Axios.delete(`/api/presets/${currentPreset._id}`)
      .then((result) => {
        closeAll()
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        updateState({ type: 'REMOVE_PRESET', payload: result?.data?.presetId })
        toast.success(result.data.message)
      })
      .catch(() => toast.error('Preset delete failed'))
  }

  const handleTextInput = (e) => setPresetName(e.target.value)

  return (
    <div className={styles.presets}>
      <div className={styles.openingButtons}>
        <button
          id='saveAs'
          onClick={open}
          className={display === 'saveAs' && styles.current}>
          save as
        </button>
        <button
          id='save'
          onClick={open}
          className={display === 'save' && styles.current}>
          save
        </button>
        <button
          id='delete'
          onClick={open}
          className={display === 'delete' && styles.current}>
          delete
        </button>
      </div>

      {display === 'saveAs' && (
        <form
          onSubmit={saveNew}
          className={cn(styles.presetOpOpen, styles.saveNew)}>
          <input
            type='text'
            onChange={handleTextInput}
            placeholder='preset name'
            maxLength={14}
          />
          <button className={styles.confirm} type='submit'>
            submit
          </button>
          <button className={styles.cancel} onClick={closeAll} type='button'>
            cancel
          </button>
        </form>
      )}

      {display === 'save' && (
        <form
          onSubmit={saveOver}
          className={cn(styles.presetOpOpen, styles.saveOver)}>
          <button className={styles.confirm} type='submit'>
            submit
          </button>
          <button className={styles.cancel} onClick={closeAll} type='button'>
            cancel
          </button>
        </form>
      )}

      {display === 'delete' && (
        <form
          onSubmit={deletePreset}
          className={cn(styles.presetOpOpen, styles.delete)}>
          <button className={styles.confirm} type='submit'>
            confirm delete
          </button>
          <button className={styles.cancel} onClick={closeAll} type='button'>
            cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default Presets
