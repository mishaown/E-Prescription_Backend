const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/connectDB');

//LOAD .ENV FILES
dotenv.config();

const app = express();

//BODY PARSER
app.use(express.json());

//CONNECT TO DATABASE
connectDB();

//DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}

// ----------------------------------------- 
// -----------------------------------------

// ROUTER FILES
const peoples = require('./routes/People');

// MOUNT ROUTERS
app.use('/api/0/people', peoples);

// ----------------------------------------- 
// -----------------------------------------

// ERROR HANDLER
app.use(errorHandler);

// ----------------------------------------
// Listening to PORT
// ----------------------------------------

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.inverse);
});

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Unhandled Rejection: ${err.message}`.red);
    
    //close the server and exit
    server.close(()=> process.exit(1));
})

// ----------------------------------------
// ----------------------------------------
