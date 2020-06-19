import React from 'react';
import Tone from 'tone';
import samples from 'samples/drums/index';

const actx = Tone.context;
const now = actx.currentTime;

const CTX = React.createContext();
export { CTX };

Tone.Transport.scheduleRepeat(repeat, '16n');

const masterVol = new Tone.Volume(-5);
const limiter = new Tone.Limiter(-8).toMaster();

// Tone.connect(masterVol, reverb);
// masterVol.connect(distortion);
// distortion.connect(reverb);
// Tone.connect(reverb, limiter);

let panVols = {
  A: new Tone.PanVol(),
  B: new Tone.PanVol(),
  C: new Tone.PanVol(),
  D: new Tone.PanVol(),
  E: new Tone.PanVol(),
  F: new Tone.PanVol(),
};
let solos = {
  A: new Tone.Solo(),
  B: new Tone.Solo(),
  C: new Tone.Solo(),
  D: new Tone.Solo(),
  E: new Tone.Solo(),
  F: new Tone.Solo(),
};
let mutes = {
  A: actx.createGain(),
  B: actx.createGain(),
  C: actx.createGain(),
  D: actx.createGain(),
  E: actx.createGain(),
  F: actx.createGain(),
};

let instruments = {
  A: new Tone.Player(samples[4].sample),
  B: new Tone.Player(samples[1].sample),
  C: new Tone.Player(samples[2].sample),
  D: new Tone.Player(samples[1].sample),
  E: new Tone.Player(samples[2].sample),
  F: new Tone.Player(samples[1].sample),
};

let reverbSends = {};
Object.keys(instruments).forEach((key) => {
  reverbSends[key] = solos[key].send('reverb', -Infinity);
});
let distortionSends = {};
Object.keys(instruments).map(
  (key) => (distortionSends[key] = solos[key].send('distortion', -Infinity))
);

const distortion = new Tone.Distortion(0.4).receive('distortion');
const reverb = new Tone.Reverb(2.4).receive('reverb');
reverb.generate();
reverb.wet.value = 0.3;
reverb.connect(limiter);
distortion.connect(limiter);
masterVol.connect(limiter);

// reverbSends.F.gain.value = -1;

// connect instruments to mixer
let instrumentKeys = Object.keys(instruments);
instrumentKeys.forEach((key) => {
  Tone.connect(instruments[key], panVols[key]);
  instruments[key].sync();
});

// connect mixer to master
let panVolKeys = Object.keys(panVols);
panVolKeys.forEach((key) => Tone.connect(panVols[key], mutes[key]));

Object.keys(mutes).forEach((key) => Tone.connect(mutes[key], solos[key]));
Object.keys(solos).forEach((key) => Tone.connect(solos[key], masterVol));

let grid = {
  A: [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
let gridKeys = Object.keys(grid);
let index = 0;

function repeat(time) {
  let step = index % 16;
  Tone.Draw.schedule(function () {
    var blocks = document.querySelectorAll('.timeblock');
    blocks.forEach((block) => {
      if (Number(block.id) === step) {
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    });
  }, time);

  for (let i = 0; i < gridKeys.length; i++) {
    if (grid[gridKeys[i]][step]) {
      let val = 3 - grid[gridKeys[i]][step];
      instruments[gridKeys[i]].volume.value = -8 * val;
      instruments[gridKeys[i]].restart(time);
    }
  }
  index++;
}

export function reducer(state, action) {
  let { payload } = action;
  let { name, value } = payload ? payload : {};

  switch (action.type) {
    case 'CHANGE_CLICK_ACTIVE':
      return { ...state, clickActive: payload };
    case 'CHANGE_TEMPO':
      Tone.Transport.bpm.value = payload;
      return { ...state, bpm: payload };
    case 'CHANGE_SWING':
      Tone.Transport.swing = payload;
      return { ...state, swing: payload };
    case 'CHANGE_SAMPLE':
      // console.log('  payload.newSampleUrl:', payload.newSampleUrl);

      instruments[name].load(payload.newSampleUrl);
      let stateCopy = [...state.samples];
      let currentIndex = stateCopy.findIndex((inst) => inst.name === name);
      let currentInst = stateCopy[currentIndex];
      currentInst.sample = payload.newSampleUrl;
      console.log(' currentInst:', currentInst);
      currentInst.sampleName = payload.newSampleName;
      return {
        ...state,
        samples: [...stateCopy],
      };
    case 'CHANGE_MIXER':
      value *= -1;
      panVols[payload.name].volume.value = value;

      return {
        ...state,
        panVols: { ...state.panVols, [name]: value },
      };
    case 'SOLO_INST':
      solos[name].solo = true;
      return {
        ...state,
        solos: { ...state.solos, [name]: true },
      };
    case 'UNSOLO_INST':
      solos[name].solo = false;
      return {
        ...state,
        solos: { ...state.solos, [name]: false },
      };
    case 'MUTE_INST':
      mutes[name].gain.linearRampToValueAtTime(0, now + 0.01);
      return {
        ...state,
        mutes: { ...state.mutes, [name]: true },
      };
    case 'UNMUTE_INST':
      mutes[name].gain.linearRampToValueAtTime(1, now + 0.01);
      return {
        ...state,
        mutes: { ...state.mutes, [name]: false },
      };
    case 'CLEAR_GRID_INST':
      let clearSection = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      grid[name] = [...clearSection];
      return {
        ...state,
        sequencerGrid: { ...state.sequencerGrid, [name]: [...clearSection] },
      };
    case 'CHANGE_SEQUENCE':
      let currentInstrumentGrid = [...state.sequencerGrid[payload.instrument]];
      if (payload.value < 2) {
        currentInstrumentGrid[payload.step]++;
      } else {
        currentInstrumentGrid[payload.step] = 0;
      }
      grid = {
        ...state.sequencerGrid,
        [payload.instrument]: [...currentInstrumentGrid],
      };
      return {
        ...state,
        sequencerGrid: {
          ...state.sequencerGrid,
          [payload.instrument]: [...currentInstrumentGrid],
        },
      };
    case 'CHANGE_REVERB_SENDS':
      reverbSends[name].gain.value = value;
      return {
        ...state,
        reverbSends: { ...state.reverbSends, [name]: value },
      };
    case 'CHANGE_DISTORTION_SENDS':
      distortionSends[name].gain.value = value;
      return {
        ...state,
        distortionSends: { ...state.distortionSends, [name]: value },
      };

    case 'START':
      Tone.Transport.start();
      return { ...state };
    case 'STOP':
      Tone.Transport.pause();
      return { ...state };
    default:
      console.log('REDUCER ERROR: action: ', action);
      // throw Error('reducer error');
      return { ...state };
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    page: 0,
    isLoggedIn: false,
    clickActive: false,
    bpm: Tone.Transport.bpm.value,
    swing: Tone.Transport.swing,

    reverbSends: {
      A: -50,
      B: -50,
      C: -50,
      F: -50,
      D: -50,
      E: -50,
    },
    distortionSends: {
      A: -50,
      B: -50,
      C: -50,
      F: -50,
      D: -50,
      E: -50,
    },

    mutes: {
      A: false,
      B: false,
      C: false,
      F: false,
      D: false,
      E: false,
    },

    solos: {
      A: solos.A.solo,
      B: solos.B.solo,
      C: solos.C.solo,
      F: solos.F.solo,
      D: solos.D.solo,
      E: solos.E.solo,
    },

    panVols: {
      A: panVols.A.volume.value,
      B: panVols.B.volume.value,
      C: panVols.C.volume.value,
      F: panVols.F.volume.value,
      D: panVols.D.volume.value,
      E: panVols.E.volume.value,
    },
    // samples: {
    //   A: samples.A[0],
    //   B: samples.snare[0],
    //   C: samples.snare[1],
    //   F: samples.F[0],
    //   D: samples.closedHat[0],
    //   E: samples.closedHat[1],
    // },
    samples: [
      { name: 'A', sample: samples[4].sample, sampleName: samples[4].name },
      { name: 'B', sample: samples[1].sample, sampleName: samples[1].name },
      { name: 'C', sample: samples[2].sample, sampleName: samples[2].name },
      { name: 'D', sample: samples[1].sample, sampleName: samples[1].name },
      { name: 'E', sample: samples[2].sample, sampleName: samples[2].name },
      { name: 'F', sample: samples[1].sample, sampleName: samples[1].name },
    ],
    sequencerGrid: {
      A: [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
