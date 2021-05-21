const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/connectDB');
const connectAUTH_DB = require('./config/connetAUTH_DB');

//LOAD .ENV FILES
// ----------------------------------------- 
dotenv.config();

const app = express();

//BODY PARSER
// ----------------------------------------- 
app.use(express.json());
app.use(cors());


//CONNECT TO DATABASES
// ----------------------------------------- 
connectDB();
// connectAUTH_DB();

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
