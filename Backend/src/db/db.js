const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to DB');
    } catch (err) {
        console.log('failed to connect to database',err)
    }
}

module.exports = connectDB;
