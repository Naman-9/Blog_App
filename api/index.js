import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config();   

mongoose.connect(process.env.MONGO)
.then(() => console.log("DataBase Connected...."))
.catch((err) => console.log("Database not connected--", err));

const app = express();
app.use(express.json());

app.listen(process.env.PORT,() => {
    console.log("running.....");
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

