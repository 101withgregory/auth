import express from 'express'
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'

// Load environment variables FIRST
dotenv.config()

const app = express();
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is listening on port ", PORT);
})