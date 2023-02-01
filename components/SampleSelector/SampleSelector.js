import React, { useContext } from 'react'
import SampleDropDown from './SampleDropDown'
import styles from './SampleSelector.module.scss'
import sampleList from '../../assets/audio'
import { CTX } from '../../context/Store'

const SampleSelector = () => {
  const [{ samples }, updateState] = useContext(CTX)

  const handleIncDec = (e) => {
    const { id, name, attributes } = e.target
    const direction = attributes.direction.value

    let sampleIndex = sampleList.findIndex((sample) => sample.name === name)
    if (direction === 'increment') {
      if (sampleIndex < sampleList.length - 1) sampleIndex++
      else sampleIndex = 0
    }
    if (direction === 'decrement') {
      if (sampleIndex > 0) sampleIndex--
      else sampleIndex = sampleList.length - 1
    }

    const newSample = sampleList[sampleIndex]

    updateState({
      type: 'CHANGE_SAMPLE',
      payload: { sample: newSample, inst: id }
    })
  }

  const handleClear = ({ target }) => {
    updateState({ type: 'CLEAR_GRID_INST', payload: { name: target.name } })
  }

  return (
    <div className={styles.sampleSelectorContainer}>
      {samples.map(({ inst, name }, i) => (
        <div
          style={{ zIndex: (6 - i) * 2 + 2 }}
          className={styles.sampleSelector}
          key={inst}>
          <button
            id={inst}
            name={name}
            direction='decrement'
            onClick={handleIncDec}
            className={styles.selectorBtn}>
            {'<'}
          </button>
          <SampleDropDown sampleName={name} inst={inst} i={i} />
          <button
            id={inst}
            name={name}
            direction='increment'
            onClick={handleIncDec}
            className={styles.selectorBtn}>
            {'>'}
          </button>
          <button name={name} onClick={handleClear} className={styles.clearBtn}>
            clear
          </button>
        </div>
      ))}
    </div>
  )
}

export default SampleSelector
