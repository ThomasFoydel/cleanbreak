import cn from 'classnames'
import React, { useContext, useState } from 'react'
import styles from './SampleSelector.module.scss'
import { CTX } from '../../context/Store'

const SampleDropDown = ({ name, samples }) => {
  const [appState, updateState] = useContext(CTX)
  const [opened, setOpened] = useState(false)

  const index = appState.samples.findIndex((sample) => sample.name === name)

  const handleSelect = (e) => {
    e.preventDefault()
    const { id } = e.target
    const newSampleName = e.target.attributes.name.value
    const index = appState.samples.findIndex(
      (sample) => sample.name === newSampleName
    )

    updateState({
      type: 'CHANGE_SAMPLE',
      payload: {
        instrument: name,
        newSampleUrl: id,
        newSampleName,
        sampleIndex: index,
        name
      }
    })
  }

  const handleClick = (e) => {
    if (e.target.getAttribute('type') === 'sample-name') {
      handleSelect(e)
    } else setOpened(!opened)
  }

  return (
    <div
      className={styles.sampleDropdown}
      onClick={handleClick}
      onMouseLeave={() => setOpened(false)}>
      <div className={styles.currentSampleName}>
        {appState.samples[index].sampleName}
      </div>
      <div
        className={styles.hoverOpen}
        style={{
          zIndex: opened ? '3' : '-1',
          opacity: opened ? '1' : '0',
          transform: opened
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-4rem)'
        }}>
        {samples.map((sample, i) => (
          <div
            type='sample-name'
            className={cn(
              styles.sampleName,
              sample.name === appState.samples[index].sampleName &&
                styles.currentActiveSample
            )}
            name={sample.name}
            onClick={handleClick}
            id={sample.sample}
            key={i}>
            {sample.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SampleDropDown
