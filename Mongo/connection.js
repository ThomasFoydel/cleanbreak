import mongoose from 'mongoose'

const connection = async () => mongoose.connect(process.env.MONGO_URI)

export default connection
