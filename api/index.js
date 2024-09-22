import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log(err);
});

const __dirname = path.resolve(); // this will find the dynamic directory name in any place or any server

const app = express();

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

app.use(express.json());

app.use(cookieParser());

app.listen(3000, ()=>{
    console.log("Server listening at port 3000");
});

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

// setting the middle-ware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
});