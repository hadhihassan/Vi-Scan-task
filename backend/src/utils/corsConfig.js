import dotenv from 'dotenv'
dotenv.config()
export const  corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS',"PATCH"],
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
};