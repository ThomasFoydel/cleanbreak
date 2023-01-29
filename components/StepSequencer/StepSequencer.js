import React, { useContext } from 'react'
import SampleSelector from '../SampleSelector/SampleSelector'
import PresetSelector from '../PresetSelector/PresetSelector'
import RevertButton from '../RevertButton/RevertButton'
import styles from './StepSequencer.module.scss'
import StartStop from '../StartStop/StartStop'
import { CTX } from '../../context/Store'
import Presets from '../Presets/Presets'
import Square from '../Square/Square'

const StepSequencer = ({ openAuth }) => {
  const [appState, updateState] = useContext(CTX)

  const handleStepClick = (e) => {
    updateState({ type: 'CHANGE_SEQUENCE', payload: e })
  }
  const handleMouseEnter = (e) => {
    if (appState.clickActive) {
      updateState({ type: 'CHANGE_SEQUENCE', payload: e })
    }
  }

  return (
    <div className={styles.sequencerContainer}>
      <div className={styles.sequencer}>
        {Object.keys(appState.sequencerGrid).map((inst, i) => (
          <div key={i} className={styles.instrumentContainer}>
            <h2 className={styles.instrumentName}>{inst}</h2>
            <div className={styles.squareRow}>
              {appState.sequencerGrid[inst].map((step, i) => (
                <Square
                  key={i}
                  step={i}
                  instrument={inst}
                  value={step}
                  handleClick={handleStepClick}
                  handleMouseEnter={handleMouseEnter}
                />
              ))}
            </div>
          </div>
        ))}
        <div className={styles.timeblocks}>
          {appState.sequencerGrid.A.map((block, i) => (
            <div className={styles.timeblock} id={i} key={i}></div>
          ))}
        </div>
      </div>
      <SampleSelector />
      <StartStop />
      <Presets openAuth={openAuth} />
      <PresetSelector openAuth={openAuth} />
      <RevertButton openAuth={openAuth} />
    </div>
  )
}

export default StepSequencer
