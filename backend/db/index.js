import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config('../.env')


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1); 
    }
};


export default dbConnection;