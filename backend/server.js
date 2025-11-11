import express from 'express'
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
// Load environment variables FIRST
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())



app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is listening on port ", PORT);
})