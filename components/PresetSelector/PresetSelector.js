import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import PresetDropDown from './PresetDropDown/PresetDropDown'
import styles from './PresetSelector.module.scss'
import { findWithAttr } from '../../utils'
import { CTX } from '../../context/Store'

const PresetSelector = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX)
  const [dropDown, setDropDown] = useState(false)
  const { status } = useSession()
  const loggedIn = status === 'authenticated'

  const { presets, currentPreset } = appState

  const current = findWithAttr(presets, 'text', currentPreset)

  const handleSelector = (e) => {
    const { id } = e.target
    if (!loggedIn) return openAuth()
    if (presets.length === 0) return

    let newCurrent
    if (id === 'left') {
      if (current > 0) newCurrent = presets[current - 1]
      else newCurrent = presets[presets.length - 1]
    }
    if (id === 'right') {
      if (current < presets.length - 1) newCurrent = presets[current + 1]
      else newCurrent = presets[0]
    }

    updateState({
      type: 'LOAD_PRESET',
      payload: { value: newCurrent.value },
      current: newCurrent.text
    })
  }

  const toggleDropDown = () => {
    if (loggedIn) setDropDown(!dropDown)
    else openAuth()
  }

  const closeDropDown = () => setDropDown(false)

  return (
    <div className={styles.presetSelector}>
      <div onClick={handleSelector} id='left' className={styles.decrement}>
        {'<'}
      </div>
      <div onMouseLeave={closeDropDown} className={styles.dropdownContainer}>
        <div
          className={styles.currentPreset}
          onClick={toggleDropDown}
          style={{
            background: dropDown ? 'rgb(100, 100, 100)' : ' #d1d1d1',
            border: dropDown ? '2px solid rgb(175, 24, 24)' : 'none',
            width: dropDown ? '23.6rem' : '24rem',
            height: dropDown ? '4.6rem' : '5rem'
          }}>
          {appState.currentPreset}
        </div>
        <PresetDropDown open={dropDown} />
      </div>
      <div onClick={handleSelector} id='right' className={styles.increment}>
        {'>'}
      </div>
    </div>
  )
}

export default PresetSelector
