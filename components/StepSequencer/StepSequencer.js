import cn from 'classnames'
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
  const [{ sequencerGrid, clickActive }, updateState] = useContext(CTX)

  const handleStepClick = (e) => {
    updateState({ type: 'CHANGE_SEQUENCE', payload: e })
  }

  const handleMouseEnter = (e) => {
    if (clickActive) updateState({ type: 'CHANGE_SEQUENCE', payload: e })
  }

  return (
    <div className={styles.sequencerContainer}>
      <div className={styles.sequencer}>
        {Object.keys(sequencerGrid).map((inst) => (
          <div key={inst} className={styles.instrumentContainer}>
            <h2 className={styles.instrumentName}>{inst}</h2>
            <div className={styles.squareRow}>
              {sequencerGrid[inst].map((step, i) => (
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
          {sequencerGrid.A.map((_, i) => (
            <div className={cn(styles.timeblock, 'timeblock')} id={i} key={i} />
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
