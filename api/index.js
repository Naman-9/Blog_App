import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'

dotenv.config();   

mongoose.connect(process.env.MONGO)
.then(() => console.log("DataBase Connected...."))
.catch((err) => console.log("Database not connected--", err));

const app = express();

app.listen(process.env.PORT,() => {
    console.log("running.....");
})

app.use('/api/user', userRoutes);

