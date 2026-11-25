import express from 'express';
import dotenv from 'dotenv';
import {connectDB, disconnectDB} from './config/db.js';

import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchListRoutes from './routes/watchlistRoutes.js';

dotenv.config();

connectDB();

const app = express()

const PORT = 5000

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/api', movieRoutes);
app.use('watchList', watchListRoutes)


const server = app.listen(PORT,  () => {
    console.log(`Server running on port : ${PORT}`);
})