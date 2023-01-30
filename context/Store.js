import * as Tone from 'tone'
import React from 'react'
import samples from '../assets/audio'

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
    instrumentKeys.reduce((p, c) => ({ ...p, [c]: new C() }), {})

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

  let grid = {
    A: [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    B: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    C: [0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0],
    D: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    E: [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1],
    F: [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1]
  }

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
        let currentIndex = stateCopy.findIndex((inst) => inst.name === name)
        const currentInst = stateCopy[currentIndex]
        currentInst.sample = payload.newSampleUrl
        currentInst.sampleName = payload.newSampleName
        return { ...state, samples: [...stateCopy] }

      case 'CHANGE_MIXER':
        value *= -1
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

      case 'CHANGE_PAN':
        preEffectChannels[type].pan.value = value
        postEffectChannels[type].pan.value = value
        return { ...state, panVolPans: { ...state.panVolPans, [type]: value } }

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
        Tone.Transport.bpm.value = value.bpm
        // distortion.distortion = value.distortion.distortion
        // distortion.wet.value = value.distortion.wet
        // pingPong.wet.value = value.pingPong.wet
        // pingPong.delayTime.value = value.pingPong.delayTime
        // pingPong.feedback.value = value.pingPong.feedback
        // reverb.preDelay = value.reverb.preDelay
        // reverb.decay = value.reverb.decay
        // reverb.wet.value = value.reverb.wet
        grid = value.sequencerGrid
        Tone.Transport.swing = value.swing

        value.samples.forEach((sample, i) => {
          instruments[sample.name].load(value.samples[i].sample)
        })

        gridKeys.forEach((key) => {
          // distortionSends[key].gain.value = value.distortionSends[key]
          // reverbSends[key].gain.value = value.reverbSends[key]
          // pingPongSends[key].gain.value = value.pingPongSends[key]
          // if (value.mutes[key]) {
          //   mutes[key].gain.linearRampToValueAtTime(0, now + 0.01)
          // } else {
          //   mutes[key].gain.linearRampToValueAtTime(1, now + 0.01)
          // }
          // panVols[key].volume.value = value.panVols[key]
          // panVols[key].pan.value = value.panVolPans[key]
          // solos[key].solo = value.solos[key]
        })

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
    const stateHook = React.useReducer(reducer, {
      currentPreset: 'default',
      isLoggedIn: false,
      clickActive: false,
      playing: false,
      presets: [],
      bpm: Tone.Transport.bpm.value,
      swing: Tone.Transport.swing,
      reverb: {
        // preDelay: reverb.preDelay,
        // decay: reverb.decay,
        // wet: reverb.wet.value
        preDelay: 0,
        decay: 0,
        wet: 0
      },
      pingPong: {
        // wet: pingPong.wet.value,
        // delayTime: pingPong.delayTime.value,
        // feedback: pingPong.feedback.value
        wet: 0,
        delayTime: 0,
        feedback: 0
      },
      distortion: {
        // distortion: distortion.distortion,
        // wet: distortion.wet.value
        distortion: 0,
        wet: 0
      },
      reverbSends: {
        A: -50,
        B: -50,
        C: -50,
        F: -50,
        D: -50,
        E: -50
      },
      distortionSends: {
        A: -5,
        B: -50,
        C: -50,
        F: -50,
        D: -50,
        E: -50
      },
      pingPongSends: {
        A: -50,
        B: -50,
        C: -50,
        F: -50,
        D: -50,
        E: -50
      },
      mutes: {
        A: false,
        B: false,
        C: false,
        F: false,
        D: false,
        E: false
      },
      solos: {
        // A: solos.A.solo,
        // B: solos.B.solo,
        // C: solos.C.solo,
        // F: solos.F.solo,
        // D: solos.D.solo,
        // E: solos.E.solo
        A: 0,
        B: 0,
        C: 0,
        F: 0,
        D: 0,
        E: 0
      },
      panVols: {
        // A: panVols.A.volume.value,
        // B: panVols.B.volume.value,
        // C: panVols.C.volume.value,
        // F: panVols.F.volume.value,
        // D: panVols.D.volume.value,
        // E: panVols.E.volume.value
        A: 0,
        B: 0,
        C: 0,
        F: 0,
        D: 0,
        E: 0
      },
      panVolPans: {
        // A: panVols.A.pan.value,
        // B: panVols.B.pan.value,
        // C: panVols.C.pan.value,
        // F: panVols.F.pan.value,
        // D: panVols.D.pan.value,
        // E: panVols.E.pan.value
        A: 0,
        B: 0,
        C: 0,
        F: 0,
        D: 0,
        E: 0
      },
      samples: [
        { name: 'A', sample: samples[29].sample, sampleName: samples[29].name },
        { name: 'B', sample: samples[13].sample, sampleName: samples[13].name },
        { name: 'C', sample: samples[63].sample, sampleName: samples[63].name },
        { name: 'D', sample: samples[51].sample, sampleName: samples[51].name },
        { name: 'E', sample: samples[10].sample, sampleName: samples[10].name },
        { name: 'F', sample: samples[57].sample, sampleName: samples[57].name }
      ],
      sequencerGrid: grid
      // {
      //   A: [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      //   B: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      //   C: [0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0],
      //   D: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      //   E: [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1],
      //   F: [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1]
      // }
    })
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
  }
}

export default Store
export { CTX }
