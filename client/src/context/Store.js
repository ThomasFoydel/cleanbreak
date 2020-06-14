import React from 'react';
import Tone from 'tone';
import samples from 'samples/drums/index';

// const actx = Tone.context;

const CTX = React.createContext();
export { CTX };

Tone.Transport.scheduleRepeat(repeat, '16n');

const masterVol = new Tone.Volume(-15);
const limiter = new Tone.Limiter(-8).toMaster();
Tone.connect(masterVol, limiter);

let instruments = {
  kick: new Tone.Player(samples.kick2),
  snare1: new Tone.Player(samples.snare1),
  snare2: new Tone.Player(samples.snare2),
  closedHat1: new Tone.Player(samples.hihat1),
  closedHat2: new Tone.Player(samples.hihat2),
  openHat: new Tone.Player(samples.openhat1),
};

let instrumentKeys = Object.keys(instruments);
instrumentKeys.forEach((key) => Tone.connect(instruments[key], masterVol));

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
  for (let i = 0; i < gridKeys.length; i++) {
    if (grid[gridKeys[i]][step]) {
      let val = 3 - grid[gridKeys[i]][step];
      instruments[gridKeys[i]].volume.value = -8 * val;
      instruments[gridKeys[i]].restart();
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
      console.log('started');
      Tone.Transport.start();

      return { ...state };
    case 'STOP':
      console.log('stopped');
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
    currentSamples: {
      kick: '', //keep a model of which samples are currently loaded here
    },
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
