import cn from 'classnames'
import React, { useContext } from 'react'
import PanControl from '../PanControl/PanControl'
import { CTX } from '../../context/Store'
import styles from './Mixer.module.scss'

const Mixer = () => {
  const [appState, updateState] = useContext(CTX)
  const handleChange = (e) => {
    let { value, name } = e.target
    updateState({ type: 'CHANGE_MIXER', payload: { name, value } })
  }
  const handleSolo = (e) => {
    let { name } = e.target
    updateState({ type: 'SOLO_INST', payload: { name } })
  }
  const handleUnSolo = (e) => {
    let { name } = e.target
    updateState({ type: 'UNSOLO_INST', payload: { name } })
  }
  const handleMute = (e) => {
    let { name } = e.target
    updateState({ type: 'MUTE_INST', payload: { name } })
  }
  const handleUnMute = (e) => {
    let { name } = e.target
    updateState({ type: 'UNMUTE_INST', payload: { name } })
  }

  return (
    <div className={cn(styles.mixer)}>
      <div className={styles.effectName}>mixer</div>
      <div className='controller'>
        {Object.keys(appState.panVols)
          .sort()
          .map((keyName, i) => (
            <div className='inst' key={i}>
              <div className='input-container'>
                <input
                  onChange={handleChange}
                  className='range-input'
                  type='range'
                  name={keyName}
                  max={30}
                  value={appState.panVols[keyName] * -1}
                />
              </div>
              <h2 className={cn('name', styles.mixerName)}>{keyName}</h2>
              <PanControl name={keyName} />
              <button
                onClick={appState.solos[keyName] ? handleUnSolo : handleSolo}
                name={keyName}
                className={cn(
                  styles.solo,
                  appState.solos[keyName] && styles.soloActive
                )}>
                solo
              </button>
              <button
                onClick={appState.mutes[keyName] ? handleUnMute : handleMute}
                name={keyName}
                className={cn(
                  styles.mute,
                  appState.mutes[keyName] && styles.muteActive
                )}>
                mute
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Mixer
