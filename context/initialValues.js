import samples from '../assets/audio'

const initialValues = {
  currentPreset: 'default',
  clickActive: false,
  playing: false,
  presets: [],
  bpm: 85,
  swing: 0,
  reverb: {
    preDelay: 0,
    decay: 0.01,
    wet: 0
  },
  pingPong: {
    wet: 0,
    delayTime: 0,
    feedback: 0
  },
  distortion: {
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
    C: 0,
    F: 0,
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
    { name: 'A', sample: samples[29].sample, sampleName: samples[29].name },
    { name: 'B', sample: samples[13].sample, sampleName: samples[13].name },
    { name: 'C', sample: samples[63].sample, sampleName: samples[63].name },
    { name: 'D', sample: samples[51].sample, sampleName: samples[51].name },
    { name: 'E', sample: samples[10].sample, sampleName: samples[10].name },
    { name: 'F', sample: samples[57].sample, sampleName: samples[57].name }
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
