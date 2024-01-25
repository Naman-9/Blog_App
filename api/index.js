import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.routes.js'
import cookieParser from 'cookie-parser';
dotenv.config();   

mongoose.connect(process.env.MONGO) 
.then(() => console.log("DataBase Connected...."))
.catch((err) => console.log("Database not connected--", err)); 

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})



app.listen(process.env.PORT,() => {
    console.log("running.....");
})