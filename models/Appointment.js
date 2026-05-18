import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    doctorId: String,
    doctorName: String,
    patientName: String,
    gender: String,
    phone: String,
    appointmentDate: String,
    appointmentTime: String,
}, { timestamps: true })

export default mongoose.model('Appointment', appointmentSchema)