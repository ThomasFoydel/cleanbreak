import samples from '../assets/audio'

const initialValues = {
  currentPreset: 'default',
  clickActive: false,
  playing: false,
  presets: [],
  bpm: 85,
  swing: 0,
  reverb: {
    wet: 1,
    preDelay: 2.2,
    decay: 0.33
  },
  pingPong: {
    wet: 1,
    delayTime: 0.52,
    feedback: 0.13
  },
  distortion: {
    wet: 1,
    distortion: 0.36
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
    A: 11,
    B: -50,
    C: -0,
    F: 1,
    D: -50,
    E: -50
  },
  pingPongSends: {
    A: -50,
    B: -50,
    C: 0,
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
    A: false,
    B: false,
    C: false,
    F: false,
    D: false,
    E: false
  },
  panVols: {
    A: 0,
    B: 0,
    C: -4,
    F: -3,
    D: 0,
    E: 0
  },
  panVolPans: {
    A: 0,
    B: 0,
    C: 0,
    F: 0,
    D: 0,
    E: 0
  },
  samples: [
    { inst: 'A', name: samples[31].name },
    { inst: 'B', name: samples[13].name },
    { inst: 'C', name: samples[63].name },
    { inst: 'D', name: samples[51].name },
    { inst: 'E', name: samples[10].name },
    { inst: 'F', name: samples[57].name }
  ],
  sequencerGrid: {
    A: [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    B: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    C: [0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0],
    D: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    E: [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1],
    F: [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1]
  }
}

export default initialValues
