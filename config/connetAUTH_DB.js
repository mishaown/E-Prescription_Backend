const mongoose = require('mongoose');

const connectAUTH_DB = async () => {
    
    const conn = await mongoose.connect(process.env.MONGODB_URI_AUTH,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.inverse);
}

module.exports = connectAUTH_DB;