import React from 'react';
import Tone from 'tone';
import samples from 'samples/drums/index';

// const actx = Tone.context;

const CTX = React.createContext();
export { CTX };

Tone.Transport.scheduleRepeat(repeat, '16n');

const masterVol = new Tone.Volume(-5);
const limiter = new Tone.Limiter(-8).toMaster();

const distortion = new Tone.Distortion(0.4);
const reverb = new Tone.Reverb(2.4);
reverb.generate();
reverb.wet.value = 0.3;

// Tone.connect(masterVol, reverb);
masterVol.connect(distortion);
distortion.connect(reverb);
// Tone.connect(reverb, limiter);
reverb.connect(limiter);

let panVols = {
  kick: new Tone.PanVol(),
  snare1: new Tone.PanVol(),
  snare2: new Tone.PanVol(),
  closedHat1: new Tone.PanVol(),
  closedHat2: new Tone.PanVol(),
  openHat: new Tone.PanVol(),
};

let instruments = {
  kick: new Tone.Player(samples.kick[4]),
  snare1: new Tone.Player(samples.snare[1]),
  snare2: new Tone.Player(samples.snare[2]),
  closedHat1: new Tone.Player(samples.hihat[1]),
  closedHat2: new Tone.Player(samples.hihat[2]),
  openHat: new Tone.Player(samples.openhat[1]),
};

// connect instruments to mixer
let instrumentKeys = Object.keys(instruments);
instrumentKeys.forEach((key) => {
  Tone.connect(instruments[key], panVols[key]);
  instruments[key].sync();
});

// connect mixer to master
let panVolKeys = Object.keys(panVols);
panVolKeys.forEach((key) => Tone.connect(panVols[key], masterVol));

let grid = {
  kick: [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  snare1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  snare2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  openHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  closedHat1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  closedHat2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  // let { prop, value } = payload ? payload : {};

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
      instruments[payload.name].load(payload.newSampleUrl);

      /* copy of state */
      let allInstrumentSamples = [...state.samples];
      /* return current instrument state  {type: "kick", name: "kick", sample: "/static/media/kick1.bd95b458.wav"}   */
      let currentInst = state.samples.filter(
        (inst) => inst.name === payload.name
      )[0];
      /* index of current instrument */
      let currentIndex = allInstrumentSamples.indexOf(currentInst);

      currentInst.sample = payload.newSampleUrl;
      allInstrumentSamples[currentIndex] = currentInst;
      return {
        ...state,
        samples: [...allInstrumentSamples],
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
    // return {
    //   ...state,
    //   sequencerGrid: {...sequencerGrid, [payload.instrument]:  }
    // };
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
    isLoggedIn: false,
    clickActive: false,
    bpm: Tone.Transport.bpm.value,
    swing: Tone.Transport.swing,
    // samples: {
    //   kick: samples.kick[0],
    //   snare1: samples.snare[0],
    //   snare2: samples.snare[1],
    //   openhat: samples.openhat[0],
    //   closedHat1: samples.closedHat[0],
    //   closedHat2: samples.closedHat[1],
    // },
    samples: [
      { type: 'kick', name: 'kick', sample: samples.kick[4] },
      { type: 'snare', name: 'snare1', sample: samples.snare[1] },
      { type: 'snare', name: 'snare2', sample: samples.snare[2] },
      { type: 'openhat', name: 'openHat', sample: samples.openhat[1] },
      { type: 'hihat', name: 'closedHat1', sample: samples.hihat[2] },
      { type: 'hihat', name: 'closedHat2', sample: samples.hihat[1] },
    ],
    sequencerGrid: {
      kick: [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      snare1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      snare2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      openHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      closedHat1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      closedHat2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
