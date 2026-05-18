import express from 'express'
import Doctor from '../models/Doctor.js'

const router = express.Router()

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find()
        res.json(doctors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get top 3 rated doctors
router.get('/top-rated', async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ rating: -1 }).limit(3)
        res.json(doctors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get single doctor
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