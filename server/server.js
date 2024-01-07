const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const server = express();
const userRoutes = require('./routes/user');
const emailRoutes = require('./routes/email');
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