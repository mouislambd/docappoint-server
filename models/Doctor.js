import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    id: String,
    name: String,
    specialty: String,
    image: String,
    experience: String,
    availability: [String],
    description: String,
    hospital: String,
    location: String,
    fee: Number,
    rating: { type: Number, default: 4.5 }
})

export default mongoose.model('Doctor', doctorSchema)