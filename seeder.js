const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load envs
dotenv.config();

// LOAD MONGOOSE SCHEMA
const PEOPLE = require('./models/Public_INFO');
const MEDICAL_PROFILE = require('./models/Public_Medical_Profile');


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
        console.error(error.message);
    }
}

// delete data
const deletePeopleDATA = async () => {
    try {
        await PEOPLE.deleteMany();
        await MEDICAL_PROFILE.deleteMany();

        console.log('PEOPLE DATA & MEDICAL PROFILE DESTROYED...'.red.inverse);
        process.exit();

    } catch (error) {
        console.error(error);
    }
}

// create medical profile
const createMedicalProfile = async () => {
    try {
        let _ids = [];

        // Getting All People Documents
        const documents = await PEOPLE.find();

        if (documents.length === 0 ) {
            console.log('No Data Found!!!'.red);
            process.exit();
        }

        documents.forEach( item => {
            _ids.push({peopleID: item._id})
        })

        // Creating Medical Profile using PeopleID 
        const people = await MEDICAL_PROFILE.insertMany(_ids);

        if (!people) {
            console.log('Could not create medical profile!'.red);
            process.exit();
        }

        console.log(`${people.length} Medical Profiles Created!`.green.inverse);
        process.exit();
    
    } catch (error) {
        console.error(error.message);
    }
}

// COMMANDS
if (process.argv[2] === '-i.people') {
    importPeopleDATA();
} 
if (process.argv[2] === '-d.people') {
    deletePeopleDATA();
} 
if (process.argv[2] === '-c.mp') {
    createMedicalProfile();
}