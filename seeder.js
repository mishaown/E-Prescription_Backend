const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load envs
dotenv.config();

// LOAD MONGOOSE SCHEMA
const PEOPLE = require('./models/Public_INFO');

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URI_PROJECT,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

// read json files
const people = JSON.parse(fs.readFileSync(`${__dirname}/_data/People.json`, 'utf-8'));

// import into database
const importPeopleDATA = async () => {
    try {
        await PEOPLE.create(people);
        console.log('PEOPLE DATA IMPORTED...'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(error);
    }
}

// delete data
const deletePeopleDATA = async () => {
    try {
        await PEOPLE.deleteMany();

        console.log('PEOPLE DATA DESTROYED...'.red.inverse);
        process.exit();

    } catch (error) {
        console.error(error);
    }
}

if (process.argv[2] === '-i.people') {
    importPeopleDATA();
} else if (process.argv[2] === '-d.people') {
    deletePeopleDATA();
}