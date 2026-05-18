import express from 'express'
import Appointment from '../models/Appointment.js'

const router = express.Router()

// Book appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body)
        await appointment.save()
        res.status(201).json({ message: 'Appointment booked!', appointment })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get user appointments
router.get('/user/:email', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userEmail: req.params.email })
        res.json(appointments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update appointment
router.put('/:id', async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete appointment
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id)
        res.json({ message: 'Deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router