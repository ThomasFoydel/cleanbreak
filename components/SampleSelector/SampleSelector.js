import React, { useContext } from 'react'
import SampleDropDown from './SampleSelector/SampleDropDown'
import styles from './SampleSelector.module.scss'
import { CTX } from '../../context/Store'
import samples from '../../assets/audio'

const SampleSelector = () => {
  const [appState, updateState] = useContext(CTX)

  const handleIncDec = (e) => {
    const direction = e.target.attributes[1].value
    const { id, name } = e.target
    const instrumentIndex = appState.samples.findIndex(
      (sample) => sample.name === name
    )
    const currentSampleName = appState.samples[instrumentIndex].sampleName
    let sampleIndex = samples.findIndex(
      (sample) => sample.name === currentSampleName
    )
    if (direction === 'increment') {
      if (sampleIndex < samples.length - 1) {
        sampleIndex++
      } else {
        sampleIndex = 0
      }
    } else if (direction === 'decrement') {
      if (sampleIndex > 0) {
        sampleIndex--
      } else {
        sampleIndex = samples.length - 1
      }
    }
    const newSampleUrl = samples[sampleIndex].sample
    const newSampleName = samples[sampleIndex].name
    updateState({
      type: 'CHANGE_SAMPLE',
      payload: {
        instrument: id,
        newSampleUrl,
        newSampleName,
        sampleIndex,
        name: name
      }
    })
  }

  const handleClear = (e) => {
    const { name } = e.target
    updateState({ type: 'CLEAR_GRID_INST', payload: { name } })
  }

  return (
    <div className={styles.sampleSelectorContainer}>
      {appState.samples.map((instrument, i) => (
        <div className={styles.sampleSelector} key={i}>
          <button
            id={instrument.type}
            name={instrument.name}
            direction='decrement'
            onClick={handleIncDec}
            className={styles.selectorBtn}>
            {'<'}
          </button>
          <SampleDropDown name={instrument.name} samples={samples} />
          <button
            id={instrument.type}
            name={instrument.name}
            direction='increment'
            onClick={handleIncDec}
            className={styles.selectorBtn}>
            {'>'}
          </button>
          <button
            name={instrument.name}
            onClick={handleClear}
            className={styles.clearBtn}>
            clear
          </button>
        </div>
      ))}
    </div>
  )
}

export default SampleSelector
