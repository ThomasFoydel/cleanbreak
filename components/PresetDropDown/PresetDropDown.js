import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './PresetDropDown.module.scss'
import { CTX } from '../../context/Store'

const PresetDropDown = ({ open }) => {
  const [appState, updateState] = useContext(CTX)

  const handleSelect = (e) => {
    let { id } = e.target
    let name = e.target.getAttribute('name')
    let value = JSON.parse(id)
    updateState({ type: 'LOAD_PRESET', payload: { value }, current: name })
  }

  return (
    <div
      className={styles.presetDropdown}
      style={{
        zIndex: open ? '3' : '-1',
        opacity: open ? '1' : '0',
        transform: open
          ? 'translateX(-50%) translateY(-.2rem)'
          : 'translateX(-50%) translateY(-5rem)'
      }}>
      <div className={styles.presetsList}>
        {appState.presets.map((preset) => (
          <div
            className={cn(
              styles.presetName,
              preset.text === appState.currentPreset &&
                styles.currentActivePreset
            )}
            key={preset.text}
            id={JSON.stringify(preset.value)}
            name={preset.text}
            onClick={handleSelect}>
            {preset.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PresetDropDown
