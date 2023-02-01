import { Schema, model, models, Types } from 'mongoose'

const presetData = new Schema({
  bpm: { type: Number },
  swing: { type: Number },
  reverb: {
    preDelay: { type: Number },
    decay: { type: Number },
    wet: { type: Number }
  },
  pingPong: {
    wet: { type: Number },
    delayTime: { type: Number },
    feedback: { type: Number }
  },
  distortion: {
    distortion: { type: Number },
    wet: { type: Number }
  },
  reverbSends: {
    A: { type: Number },
    B: { type: Number },
    C: { type: Number },
    F: { type: Number },
    D: { type: Number },
    E: { type: Number }
  },
  distortionSends: {
    A: { type: Number },
    B: { type: Number },
    C: { type: Number },
    F: { type: Number },
    D: { type: Number },
    E: { type: Number }
  },
  pingPongSends: {
    A: { type: Number },
    B: { type: Number },
    C: { type: Number },
    F: { type: Number },
    D: { type: Number },
    E: { type: Number }
  },
  mutes: {
    A: { type: Boolean },
    B: { type: Boolean },
    C: { type: Boolean },
    F: { type: Boolean },
    D: { type: Boolean },
    E: { type: Boolean }
  },
  solos: {
    A: { type: Boolean },
    B: { type: Boolean },
    C: { type: Boolean },
    F: { type: Boolean },
    D: { type: Boolean },
    E: { type: Boolean }
  },
  panVols: {
    A: { type: Number },
    B: { type: Number },
    C: { type: Number },
    F: { type: Number },
    D: { type: Number },
    E: { type: Number }
  },
  panVolPans: {
    A: { type: Number },
    B: { type: Number },
    C: { type: Number },
    F: { type: Number },
    D: { type: Number },
    E: { type: Number }
  },
  samples: [{ name: { type: String }, inst: { type: String } }],
  sequencerGrid: {
    A: { type: [Number] },
    B: { type: [Number] },
    C: { type: [Number] },
    D: { type: [Number] },
    E: { type: [Number] },
    F: { type: [Number] }
  }
})

const presetSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: Types.ObjectId, required: true, ref: 'User' },
    state: { type: presetData, required: true }
  },
  { timestamps: true }
)

const Preset = models.Preset || model('Preset', presetSchema)
export default Preset
