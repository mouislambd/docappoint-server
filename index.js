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

app.use(cors({
    origin: ['http://localhost:5173', 'https://docappoint-client.vercel.app'],
    credentials: true
}))
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