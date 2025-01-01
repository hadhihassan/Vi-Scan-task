import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = YAML.load('./swagger.yaml'); 

import { connectToDatabase } from './lib/db.js';
import { corsOptions } from './utils/corsConfig.js';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import profileRoutes from './routes/profile.routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import YAML from 'yamljs'

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/profile', profileRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is runing on", PORT);
    connectToDatabase()
})