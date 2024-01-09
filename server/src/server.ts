import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config();
const server = express();
import userRoutes from './routes/user';
import emailRoutes from './routes/email';
server.use(cors());    

server.use(bodyParser.json());
server.use(userRoutes);
server.use(emailRoutes);
const startServer =async () => {
    await mongoose.connect(process.env.MONGODB_SRV);
    server.listen(4000, () => {
        console.log('Server is running on port 4000');
    })
}
startServer();