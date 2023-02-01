import cn from 'classnames'
import React, { useContext, useState } from 'react'
import styles from './SampleSelector.module.scss'
import sampleList from '../../assets/audio'
import { CTX } from '../../context/Store'

const SampleDropDown = ({ sampleName, inst, i }) => {
  const [, updateState] = useContext(CTX)
  const [opened, setOpened] = useState(false)

  const handleSelect = (name) => {
    const selectedIndex = sampleList.findIndex((s) => s.name === name)
    const selectedSample = sampleList[selectedIndex]
    const payload = { sample: selectedSample, inst }
    updateState({ type: 'CHANGE_SAMPLE', payload })
  }

  const toggleOpen = () => setOpened((o) => !o)

  return (
    <div
      className={styles.sampleDropDown}
      onClick={toggleOpen}
      onMouseLeave={() => setOpened(false)}>
      <div
        style={{ zIndex: (6 - i) * 2 + 1 }}
        className={cn(
          styles.currentSampleName,
          opened && styles.currentSampleNameListOpen
        )}>
        <p>{sampleName}</p>
      </div>
      <div
        className={styles.hoverOpen}
        style={{
          pointerEvents: opened ? 'auto' : 'none',
          zIndex: (6 - i) * 2,
          opacity: opened ? '1' : '0',
          transform: opened
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-4rem)'
        }}>
        {sampleList.map(({ name }) => (
          <div
            type='sample-name'
            className={cn(
              styles.sampleName,
              name === sampleName && styles.currentActiveSample
            )}
            name={name}
            onClick={() => handleSelect(name)}
            id={name}
            key={name}>
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SampleDropDown
