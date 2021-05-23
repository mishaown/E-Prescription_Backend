const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser')
const mongoSanitizer = require('express-mongo-sanitize');
const helmet = require('helmet');
const XSS = require('xss-clean');
const rateLimit = require("express-rate-limit");
const hpp = require('hpp');

//LOAD .ENV FILES
// ----------------------------------------- 
dotenv.config();

//CONNECT TO DATABASE
// ----------------------------------------- 
connectDB();

const app = express();

//MIDDLEWARE
// ----------------------------------------- 
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitizer());
app.use(helmet());
app.use(XSS());
app.use(hpp());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 100 requests per windowMs
  });

app.use(limiter);


//DEV LOGGING MIDDLEWARE
// ----------------------------------------- 
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}


// ROUTER FILES
// -----------------------------------------
const peoples = require('./routes/People');
const doctors = require('./routes/Doctor');

// MOUNT ROUTERS
// -----------------------------------------
app.use('/api/0/people', peoples);
app.use('/api/0/doc', doctors);


// ERROR HANDLER
// -----------------------------------------
app.use(errorHandler);


// Listening to PORT
// ----------------------------------------
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.inverse);
});

//Handle unhandled rejections
// ----------------------------------------- 
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Unhandled Rejection: ${err.message}`.red);
    
    //close the server and exit
    server.close(()=> process.exit(1));
})
