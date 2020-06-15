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
let solos = {
  kick: new Tone.Solo(),
  snare1: new Tone.Solo(),
  snare2: new Tone.Solo(),
  closedHat1: new Tone.Solo(),
  closedHat2: new Tone.Solo(),
  openHat: new Tone.Solo(),
};
let mutes = {
  kick: actx.createGain(),
  snare1: actx.createGain(),
  snare2: actx.createGain(),
  closedHat1: actx.createGain(),
  closedHat2: actx.createGain(),
  openHat: actx.createGain(),
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
panVolKeys.forEach((key) => Tone.connect(panVols[key], solos[key]));

Object.keys(solos).forEach((key) => Tone.connect(solos[key], mutes[key]));

Object.keys(mutes).forEach((key) => Tone.connect(mutes[key], masterVol));

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

    mutes: {
      kick: false,
      snare1: false,
      snare2: false,
      openHat: false,
      closedHat1: false,
      closedHat2: false,
    },

    solos: {
      kick: solos.kick.solo,
      snare1: solos.snare1.solo,
      snare2: solos.snare2.solo,
      openHat: solos.openHat.solo,
      closedHat1: solos.closedHat1.solo,
      closedHat2: solos.closedHat2.solo,
    },

    panVols: {
      kick: panVols.kick.volume.value,
      snare1: panVols.snare1.volume.value,
      snare2: panVols.snare2.volume.value,
      openHat: panVols.openHat.volume.value,
      closedHat1: panVols.closedHat1.volume.value,
      closedHat2: panVols.closedHat2.volume.value,
    },
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
