import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors');

app.use(cors({
    origin: ['https://docappoint-client-qc91.vercel.app', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)

app.get('/', (req, res) => {
    res.send('DocAppoint Server Running!')
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected!')
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.error(err))