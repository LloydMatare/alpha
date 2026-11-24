import express from 'express';
import dotenv from 'dotenv';
import {connectDB, disconnectDB} from './config/db.js';

import movieRoute from './routes/movieRoute.js';

dotenv.config();

connectDB();

const app = express()

const PORT = 5000

// Middleware
app.use(express.json());
app.use('/api', movieRoute);


const server = app.listen(PORT,  () => {
    console.log(`Server running on port : ${PORT}`);
})