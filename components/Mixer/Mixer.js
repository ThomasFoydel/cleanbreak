import cn from 'classnames'
import React, { useContext } from 'react'
import RangeInput from '../RangeInput/RangeInput'
import PanControl from './PanControl/PanControl'
import { CTX } from '../../context/Store'
import styles from './Mixer.module.scss'

const Mixer = () => {
  const [{ panVols, solos, mutes }, updateState] = useContext(CTX)

  const updateMixer = (type, { name, value }) => {
    updateState({ type, payload: { name, value } })
  }

  const handleChange = (e) => updateMixer('CHANGE_MIXER', e)

  const handleSolo = (e) => updateMixer('SOLO_INST', e.target)

  const handleUnSolo = (e) => updateMixer('UNSOLO_INST', e.target)

  const handleMute = (e) => updateMixer('MUTE_INST', e.target)

  const handleUnMute = (e) => updateMixer('UNMUTE_INST', e.target)

  return (
    <div className={cn(styles.mixer)}>
      <div className={styles.effectName}>mixer</div>
      <div className='controller'>
        {Object.keys(panVols)
          .sort()
          .map((keyName) => (
            <div className='inst' key={keyName}>
              <RangeInput
                onChange={handleChange}
                name={keyName}
                min={-70}
                max={0}
                value={panVols[keyName]}
              />
              <h2 className={cn('name', styles.mixerName)}>{keyName}</h2>
              <PanControl name={keyName} />
              <button
                onClick={solos[keyName] ? handleUnSolo : handleSolo}
                name={keyName}
                className={cn(
                  styles.solo,
                  solos[keyName] && styles.soloActive
                )}>
                solo
              </button>
              <button
                onClick={mutes[keyName] ? handleUnMute : handleMute}
                name={keyName}
                className={cn(
                  styles.mute,
                  mutes[keyName] && styles.muteActive
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
