import React from 'react'
import * as Tone from 'tone'
import samples from '../assets/audio'
import initialValues from './initialValues'

let Store = () => <></>
let CTX

if (Tone && typeof window !== 'undefined') {
  let started = false

  CTX = React.createContext()

  Tone.Transport.bpm.value = 85

  Tone.Transport.scheduleRepeat(repeat, '16n')

  const masterVol = new Tone.Volume(-5)
  const limiter = new Tone.Limiter(-8).toDestination()

  const instruments = {
    A: new Tone.Player(samples[29].sample),
    B: new Tone.Player(samples[13].sample),
    C: new Tone.Player(samples[63].sample),
    D: new Tone.Player(samples[51].sample),
    E: new Tone.Player(samples[10].sample),
    F: new Tone.Player(samples[57].sample)
  }

  const instrumentKeys = Object.keys(instruments)

  instrumentKeys.forEach((key) => {
    instruments[key].volume.value = 0
    setTimeout(() => instruments[key].start(0, 0, 0), 500)
  })

  const makeOneForEachInstrument = (C) =>
    instrumentKeys.reduce((p, k) => ({ ...p, [k]: new C() }), {})

  const preEffectChannels = makeOneForEachInstrument(Tone.Channel)

  const reverbChannels = makeOneForEachInstrument(Tone.Channel)
  const distortionChannels = makeOneForEachInstrument(Tone.Channel)
  const pingPongChannels = makeOneForEachInstrument(Tone.Channel)

  const distortions = makeOneForEachInstrument(Tone.Distortion)
  const reverbs = makeOneForEachInstrument(Tone.Reverb)
  const pingPongs = makeOneForEachInstrument(Tone.PingPongDelay)

  const postEffectChannels = makeOneForEachInstrument(Tone.Channel)

  instrumentKeys.forEach((key) => {
    Tone.connect(instruments[key], preEffectChannels[key])

    Tone.connect(preEffectChannels[key], reverbChannels[key])
    Tone.connect(preEffectChannels[key], distortionChannels[key])
    Tone.connect(preEffectChannels[key], pingPongChannels[key])
    Tone.connect(preEffectChannels[key], masterVol)

    Tone.connect(reverbChannels[key], reverbs[key])
    Tone.connect(distortionChannels[key], distortions[key])
    Tone.connect(pingPongChannels[key], pingPongs[key])

    Tone.connect(reverbs[key], postEffectChannels[key])
    Tone.connect(distortions[key], postEffectChannels[key])
    Tone.connect(pingPongs[key], postEffectChannels[key])

    Tone.connect(postEffectChannels[key], masterVol)
    instruments[key].sync()
  })

  masterVol.connect(limiter)

  let grid = initialValues.sequencerGrid

  const gridKeys = Object.keys(grid)

  let index = 0

  function repeat(time) {
    const step = index % 16
    Tone.Draw.schedule(function () {
      const blocks = document.querySelectorAll('.timeblock')
      blocks.forEach((block) => {
        if (Number(block.id) === step) {
          block.classList.add('active')
        } else {
          block.classList.remove('active')
        }
      })
    }, time)

    for (let i = 0; i < gridKeys.length; i++) {
      if (grid[gridKeys[i]][step]) {
        const val = 3 - grid[gridKeys[i]][step]
        instruments[gridKeys[i]].volume.value = -8 * val
        instruments[gridKeys[i]].restart(time)
      }
    }
    index++
  }

  const applyPreset = ({
    bpm,
    swing,
    reverb,
    distortion,
    pingPong,
    reverbSends,
    distortionSends,
    pingPongSends,
    mutes,
    solos,
    panVols,
    panVolPans,
    samples,
    sequencerGrid
  }) => {
    Tone.Transport.bpm.value = bpm
    Tone.Transport.swing = swing
    for (const r of Object.values(reverbs)) {
      r.preDelay = reverb.preDelay
      r.decay = reverb.decay
      r.wet.value = reverb.wet
    }
    for (const d of Object.values(distortions)) {
      d.distortion = distortion.distortion
      d.wet.value = distortion.wet
    }
    for (const p of Object.values(pingPongs)) {
      p.delayTime.value = pingPong.delayTime
      p.feedback.value = pingPong.feedback
      p.wet.value = pingPong.wet
    }

    for (const key in distortionSends) {
      distortionChannels[key].volume.value = distortionSends[key]
    }

    for (const key in pingPongSends) {
      pingPongChannels[key].volume.value = pingPongSends[key]
    }

    for (const key in reverbSends) {
      reverbChannels[key].volume.value = reverbSends[key]
    }

    for (const key in mutes) {
      preEffectChannels[key].mute = mutes[key]
    }

    for (const key in solos) {
      preEffectChannels[key].solo = solos[key]
      postEffectChannels[key].solo = solos[key]
      reverbChannels[key].solo = solos[key]
      distortionChannels[key].solo = solos[key]
      pingPongChannels[key].solo = solos[key]
    }

    for (const key in panVols) {
      preEffectChannels[key].volume.value = panVols[key]
    }

    for (const key in panVolPans) {
      preEffectChannels[key].pan.value = panVolPans[key]
      postEffectChannels[key].pan.value = panVolPans[key]
    }

    for (const sample of samples) {
      instruments[sample.name].load(sample.sample)
    }

    grid = sequencerGrid
  }

  applyPreset(initialValues)

  function reducer(state, action) {
    const { payload } = action
    let { name, value, type } = payload ? payload : {}

    switch (action.type) {
      case 'LOGIN':
        const { user, token } = payload
        localStorage.setItem('cleanbreak-token', token)
        const presetsArray = []
        if (user.presets) {
          user.presets.forEach((preset, i) => {
            const presetObj = {
              text: preset.name,
              value: preset.params
            }
            presetsArray.push(presetObj)
          })
        }
        return {
          ...state,
          isLoggedIn: true,
          user: { name: user.name, email: user.email },
          presets: presetsArray
        }

      case 'LOGOUT':
        localStorage.removeItem('cleanbreak-token')
        return { ...state, isLoggedIn: false }

      case 'REVERT':
        return { ...state }

      case 'CHANGE_CLICK_ACTIVE':
        return { ...state, clickActive: payload }

      case 'CHANGE_TEMPO':
        Tone.Transport.bpm.value = payload
        return { ...state, bpm: payload }

      case 'CHANGE_SWING':
        Tone.Transport.swing = payload
        return { ...state, swing: payload }

      case 'CHANGE_SAMPLE':
        instruments[name].load(payload.newSampleUrl)
        const stateCopy = [...state.samples]
        const currentIndex = stateCopy.findIndex((inst) => inst.name === name)
        const currentInst = stateCopy[currentIndex]
        currentInst.sample = payload.newSampleUrl
        currentInst.sampleName = payload.newSampleName
        return { ...state, samples: [...stateCopy] }

      case 'CHANGE_MIXER':
        preEffectChannels[name].volume.value = value
        return {
          ...state,
          panVols: { ...state.panVols, [name]: value }
        }

      case 'SOLO_INST':
        preEffectChannels[name].solo = true
        postEffectChannels[name].solo = true
        reverbChannels[name].solo = true
        distortionChannels[name].solo = true
        pingPongChannels[name].solo = true
        return {
          ...state,
          solos: { ...state.solos, [name]: true }
        }

      case 'UNSOLO_INST':
        preEffectChannels[name].solo = false
        postEffectChannels[name].solo = false
        reverbChannels[name].solo = false
        distortionChannels[name].solo = false
        pingPongChannels[name].solo = false
        return {
          ...state,
          solos: { ...state.solos, [name]: false }
        }

      case 'MUTE_INST':
        preEffectChannels[name].mute = true
        return {
          ...state,
          mutes: { ...state.mutes, [name]: true }
        }

      case 'UNMUTE_INST':
        preEffectChannels[name].mute = false
        return {
          ...state,
          mutes: { ...state.mutes, [name]: false }
        }

      case 'CHANGE_PAN':
        preEffectChannels[type].pan.value = value
        postEffectChannels[type].pan.value = value
        return { ...state, panVolPans: { ...state.panVolPans, [type]: value } }

      case 'CLEAR_GRID_INST':
        const clearSection = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        grid[name] = [...clearSection]
        return {
          ...state,
          sequencerGrid: { ...state.sequencerGrid, [name]: [...clearSection] }
        }

      case 'CHANGE_SEQUENCE':
        const currentInstrumentGrid = [
          ...state.sequencerGrid[payload.instrument]
        ]
        if (payload.value < 2) {
          currentInstrumentGrid[payload.step]++
        } else {
          currentInstrumentGrid[payload.step] = 0
        }
        grid = {
          ...state.sequencerGrid,
          [payload.instrument]: [...currentInstrumentGrid]
        }
        return {
          ...state,
          sequencerGrid: {
            ...state.sequencerGrid,
            [payload.instrument]: [...currentInstrumentGrid]
          }
        }

      case 'CHANGE_REVERB_SENDS':
        reverbChannels[name].volume.value = value
        return {
          ...state,
          reverbSends: { ...state.reverbSends, [name]: value }
        }

      case 'CHANGE_DISTORTION_SENDS':
        distortionChannels[name].volume.value = value
        return {
          ...state,
          distortionSends: { ...state.distortionSends, [name]: value }
        }

      case 'CHANGE_PINGPONG_SENDS':
        pingPongChannels[name].volume.value = value
        return {
          ...state,
          pingPongSends: { ...state.pingPongSends, [name]: value }
        }

      case 'CHANGE_DISTORTION':
        if (type === 'distortion') {
          for (const distortion of Object.values(distortions)) {
            distortion.distortion = value
          }
        } else {
          for (const distortion of Object.values(distortions)) {
            distortion[type].value = value
          }
        }
        return { ...state, distortion: { ...state.distortion, [type]: value } }

      case 'CHANGE_PINGPONG':
        for (const pingPong of Object.values(pingPongs)) {
          pingPong[type].value = value
        }
        return { ...state, pingPong: { ...state.pingPong, [type]: value } }

      case 'CHANGE_REVERB':
        if (type === 'wet') {
          for (const reverb of Object.values(reverbs)) reverb.wet.value = value
        } else {
          for (const reverb of Object.values(reverbs)) reverb[type] = value
        }
        return {
          ...state,
          reverb: { ...state.reverb, [type]: value }
        }

      case 'START':
        if (!started) {
          started = true
          Tone.start()
        }
        Tone.Transport.start()
        return { ...state, playing: true }

      case 'STOP':
        Tone.Transport.pause()
        return { ...state, playing: false }

      case 'LOAD_PRESET':
        applyPreset(value)
        return { ...state, ...value, currentPreset: action.current }

      case 'UPDATE_PRESETS':
        return {
          ...state,
          presets: [...payload.presets],
          currentPreset: payload.current
        }

      default:
        console.error('REDUCER ERROR: action: ', action)
        return { ...state }
    }
  }

  Store = function (props) {
    const stateHook = React.useReducer(reducer, initialValues)
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
  }
}

export default Store
export { CTX }
