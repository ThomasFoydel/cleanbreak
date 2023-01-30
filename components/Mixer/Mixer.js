import cn from 'classnames'
import React, { useContext } from 'react'
import RangeInput from '../RangeInput/RangeInput'
import PanControl from './PanControl/PanControl'
import { CTX } from '../../context/Store'
import styles from './Mixer.module.scss'

const Mixer = () => {
  const [appState, updateState] = useContext(CTX)

  const updateMixer = (type, { target }) => {
    const { name, value } = target
    updateState({ type, payload: { name, value } })
  }

  const handleChange = (e) => updateMixer('CHANGE_MIXER', e)

  const handleSolo = (e) => updateMixer('SOLO_INST', e)

  const handleUnSolo = (e) => updateMixer('UNSOLO_INST', e)

  const handleMute = (e) => updateMixer('MUTE_INST', e)

  const handleUnMute = (e) => updateMixer('UNMUTE_INST', e)

  return (
    <div className={cn(styles.mixer)}>
      <div className={styles.effectName}>mixer</div>
      <div className='controller'>
        {Object.keys(appState.panVols)
          .sort()
          .map((keyName, i) => (
            <div className='inst' key={i}>
              <RangeInput
                onChange={handleChange}
                name={keyName}
                min={-50}
                max={0}
                value={appState.panVols[keyName]}
              />
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
