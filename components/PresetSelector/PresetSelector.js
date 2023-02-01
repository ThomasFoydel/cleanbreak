import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import PresetDropDown from './PresetDropDown/PresetDropDown'
import styles from './PresetSelector.module.scss'
import { findWithAttr } from '../../utils'
import { CTX } from '../../context/Store'

const PresetSelector = ({ openAuth }) => {
  const [{ presets, currentPreset }, updateState] = useContext(CTX)
  const [dropDown, setDropDown] = useState(false)
  const { status } = useSession()
  const loggedIn = status === 'authenticated'

  const handleSelector = (e) => {
    const { id } = e.target
    if (!loggedIn) return openAuth()
    if (presets.length <= 1) return
    const current = findWithAttr(presets, 'name', currentPreset.name)

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
      current: newCurrent
    })
  }

  const toggleDropDown = () => {
    if (!loggedIn) openAuth()
    else if (presets.length > 0) setDropDown(!dropDown)
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
            border: dropDown
              ? '2px solid rgb(175, 24, 24)'
              : '2px solid rgb(100, 100, 100)',
          }}>
          {currentPreset.name || 'no presets saved yet'}
        </div>
        <PresetDropDown open={dropDown} onClose={closeDropDown} />
      </div>
      <div onClick={handleSelector} id='right' className={styles.increment}>
        {'>'}
      </div>
    </div>
  )
}

export default PresetSelector
