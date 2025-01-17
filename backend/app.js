
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

app.use(cookieParser());
app.use(express.urlencoded({ extended: true , limit : '20kb' }))
app.use(express.json({limit : '20kb'}))
app.use(express.static('public'));






import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)



















export default app;