import { Schema, model, models, Types } from 'mongoose'

const sampleSchema = new Schema({
  name: { type: String, required: true },
  inst: { type: String, required: true }
})

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
  samples: { type: [sampleSchema], _id: false },
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
    name: {
      type: String,
      required: true,
      validate: {
        validator: (str) => str.length <= 14,
        message: 'Preset name cannot exceed characters'
      }
    },
    author: { type: Types.ObjectId, required: true, ref: 'User' },
    state: { type: presetData, required: true }
  },
  { timestamps: true }
)

const Preset = models.Preset || model('Preset', presetSchema)
export default Preset
