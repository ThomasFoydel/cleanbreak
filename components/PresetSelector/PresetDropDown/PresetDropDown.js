import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './PresetDropDown.module.scss'
import { findWithAttr } from '../../../utils'
import { CTX } from '../../../context/Store'

const PresetDropDown = ({ open, onClose }) => {
  const [{ presets, currentPreset }, updateState] = useContext(CTX)

  const handleSelect = ({ target }) => {
    const selectedPresetIndex = findWithAttr(presets, 'name', target.id)
    const selectedPreset = presets[selectedPresetIndex]
    updateState({ type: 'LOAD_PRESET', payload: selectedPreset })
    onClose()
  }

  return (
    <div
      className={styles.presetDropDown}
      style={{
        zIndex: open ? '3' : '-1',
        opacity: open ? '1' : '0',
        transform: open
          ? 'translateX(-50%) translateY(-.2rem)'
          : 'translateX(-50%) translateY(-5rem)'
      }}>
      <div className={styles.presetsList}>
        {presets.map((preset) => (
          <div
            className={cn(
              styles.presetName,
              preset.name === currentPreset.name && styles.currentActivePreset
            )}
            key={preset.name}
            id={preset.name}
            onClick={handleSelect}>
            {preset.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PresetDropDown
