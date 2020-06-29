const mongoose = require('mongoose');

const userSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  presets: {
    type: Array,
    default: {
      name: 'default',
      author: 'thomas',
      params: {
        bpm: 85,
        distortion: { wet: 1, distortion: 0.4 },
        pingPong: { wet: 1, delayTime: 0.25, feedback: 0.125 },
        distortionSends: {
          A: -5,
          B: -50,
          C: -50,
          D: -50,
          E: -50,
          F: -50,
        },
        mutes: { A: false, B: false, C: false, D: false, E: false, F: false },
        panVolPans: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
        },
        panVols: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
        },
        reverb: {
          preDelay: 0.01,
          decay: 2.4,
          wet: 1,
        },
        reverbSends: {
          A: -50,
          B: -50,
          C: -50,
          D: -50,
          E: -50,
          F: -50,
        },
        samples: [
          {
            name: 'A',
            sample: '/static/media/trap80801.02a977b0.wav',
            sampleName: 'trap80801',
          },
          {
            name: 'B',
            sample: '/static/media/lofikick01.24a08143.wav',
            sampleName: 'lofiKick01',
          },
          {
            name: 'C',
            sample: '/static/media/trapsnare01.e737c4df.wav',
            sampleName: 'trapSnare01',
          },
          {
            name: 'D',
            sample: '/static/media/trapperc01.f4cf5418.wav',
            sampleName: 'trapPerc01',
          },
          {
            name: 'E',
            sample: '/static/media/lofihihat01.0ba49df5.wav',
            sampleName: 'lofiHiHat01',
          },
          {
            name: 'F',
            sample: '/static/media/traprim01.14e8a253.wav',
            sampleName: 'trapRim01',
          },
        ],
        sequencerGrid: {
          A: [(2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0)],
          B: [(2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0)],
          C: [(0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0)],
          D: [(0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0)],
          E: [(2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1)],
          F: [(1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1)],
        },

        solos: {
          A: false,
          B: false,
          C: false,
          D: false,
          E: false,
          F: false,
        },

        swing: 0,
      },
    },
  },
};

module.exports = mongoose.model('User', userSchema);
