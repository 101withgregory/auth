import express from 'express'
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
import path from 'path'
// Load environment variables FIRST
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

const allowedOrigin = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_URL 
  : 'http://localhost:5173';

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())



app.use('/api/auth', authRoutes)

if(process.env.NODE_ENV=== 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/dist')));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
 } )
}

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is listening on port ", PORT);
})