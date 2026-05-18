import express from 'express'
import Doctor from '../models/Doctor.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find()
        res.json(doctors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/top-rated', async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ rating: -1 }).limit(3)
        res.json(doctors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/seed', async (req, res) => {
    try {
        await Doctor.deleteMany()
        const doctors = [
            { name: "Dr. Ayesha Rahman", specialty: "Cardiologist", image: "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827776.jpg", experience: "10 years", availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"], description: "Highly experienced cardiologist specializing in heart diseases.", hospital: "Labaid Cardiac Hospital", location: "Dhanmondi, Dhaka", fee: 800, rating: 4.9 },
            { name: "Dr. Abdul Karim Hossain", specialty: "Neurologist", image: "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg", experience: "12 years", availability: ["10:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"], description: "Expert neurologist with vast experience in treating brain disorders.", hospital: "Square Hospital", location: "Panthapath, Dhaka", fee: 1000, rating: 4.8 },
            { name: "Dr. Nusrat Jahan", specialty: "Dermatologist", image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg", experience: "8 years", availability: ["09:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"], description: "Specialist in skin care and cosmetic dermatology.", hospital: "United Hospital", location: "Gulshan, Dhaka", fee: 900, rating: 4.9 },
            { name: "Dr. Rafiqul Islam", specialty: "Orthopedic Surgeon", image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg", experience: "15 years", availability: ["08:00 AM - 11:00 AM", "04:00 PM - 07:00 PM"], description: "Renowned orthopedic surgeon specializing in joint replacement.", hospital: "BIRDEM General Hospital", location: "Shahbag, Dhaka", fee: 1200, rating: 4.7 },
            { name: "Dr. Sumaiya Akter", specialty: "Gynecologist", image: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg", experience: "9 years", availability: ["10:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"], description: "Experienced gynecologist providing comprehensive women's healthcare.", hospital: "Evercare Hospital", location: "Bashundhara, Dhaka", fee: 850, rating: 4.8 },
            { name: "Dr. Tanvir Ahmed", specialty: "Pediatrician", image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg", experience: "11 years", availability: ["09:00 AM - 12:00 PM", "05:00 PM - 08:00 PM"], description: "Dedicated pediatrician committed to providing the best healthcare for children.", hospital: "Shishu Hospital", location: "Mirpur, Dhaka", fee: 700, rating: 4.9 }
        ]
        await Doctor.insertMany(doctors)
        res.json({ message: 'Seeded!', count: doctors.length })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' })
        res.json(doctor)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router