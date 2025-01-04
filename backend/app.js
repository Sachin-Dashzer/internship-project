
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

dotenv.config('.env')

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
    methods : ["GET", "POST" , "PUT" , "DELETE"]
}))

app.use(express.urlencoded({ extended: true , limit : '20kb' }))
app.use(express.json({limit : '20kb'}))
app.use(express.static('public'));
app.use(cookieParser());






import router from './routes/auth.routes.js';

app.use("/api/auth" , router)



















export default app;