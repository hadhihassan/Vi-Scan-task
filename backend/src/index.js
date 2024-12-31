import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from './utils/corsConfig.js';
import { prisma, connectToDatabase } from './lib/db.js'; 

import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(
    cors(corsOptions)
);

app.use('/api/auth', authRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is runing on", PORT);
    connectToDatabase()
})